import {
  createNarrator,
  getNarrator,
  createStory,
  getStory,
  StoryContent,
  updateStory,
} from "~/lib/db/db.server";
import type { Story } from "@prisma/client";
import type { Narrator, NarratorInstructions } from "~/lib/db/db.server";
import { dvError } from "~/lib/utils/dvError";
import { json } from "@remix-run/node";
import { z } from "zod";

export const beginStory = async ({
  title,
  summary,
  authorId,
  narratorInstructions,
}: {
  title: string;
  summary: string;
  authorId: string;
  narratorInstructions: NarratorInstructions;
}) => {
  const story = await createStory({
    title,
    summary,
    authorId,
    isActive: true,
  });

  const narrator = createNarrator({
    storyId: story.id,
    instructions: narratorInstructions,
  });

  return { story, narrator };
};

export const buildSystemPrompt = async ({
  story,
  scenario,
}: {
  story: StoryContent;
  scenario: "integrate" | "narrate";
}) => {
  const narrator = story.narrator as Narrator;
  const narratorInstructions =
    narrator?.instructions && narrator.instructions[scenario];
  const storySummary = story.summary;
  const storyTitle = story.title;
  const characters = story.characters.reduce((acc, curr) => {
    const { name, description } = curr;
    if (!name) throw dvError.badRequest("Character must have a name");
    acc[name] = description;
    return acc;
  }, {} as Record<string, string | null>);

  const characterString = JSON.stringify({ characters });

  const systemPrompt = `${narratorInstructions} title:${storyTitle}
   \n summary: ${storySummary}\n ${characterString}\n
   ${story.content}`;

  return systemPrompt;
};

const expectedResponseSchema = z.discriminatedUnion("scenario", [
  z.object({
    scenario: z.literal("integrate"),
    text: z.string(),
  }),
  z.object({
    scenario: z.literal("narrate"),
    text: z.string(),
    userPrompt: z.string(),
    characters: z.record(z.string()),
    nextCharacter: z.string(),
  }),
  z.object({
    scenario: z.literal("characters"),
    characters: z.record(z.string()),
  }),
]);

type ExpectedResponseSchema = z.infer<typeof expectedResponseSchema>;

export const validateResults = ({
  results,
  scenario,
}: {
  results: string;
  scenario: "integrate" | "characters" | "narrate";
}) => {
  try {
    const jsonResults = JSON.parse(results);
    jsonResults.scenario = scenario;
    const validatedResults = expectedResponseSchema.parse(jsonResults);
    return validatedResults as ExpectedResponseSchema;
  } catch (e) {
    console.log(e);
    console.log("results", results);
    return null;
  }
};

export const narrate = async ({
  story,
  newInput,
  generator,
}: {
  story: StoryContent;
  newInput: string;
  generator: (systemPrompt: string, input: string) => Promise<string>;
}) => {
  const narrator = story.narrator as Narrator;
  if (!narrator) throw dvError.badRequest("Story has no narrator");
  // first integrate the new input into the story
  const systemPrompt = await buildSystemPrompt({
    story,
    scenario: "integrate",
  });
  const results = (await generator(systemPrompt, newInput)) as string;
  const validatedResults = validateResults({
    results: results,
    scenario: "integrate",
  });
  if (!validatedResults) {
    console.log("results", results);
    throw dvError.badRequest("Invalid results");
  }
  let updatedContent =
    validatedResults.scenario === "integrate" &&
    `${story.content}\n${validatedResults.text}`;
  if (!updatedContent) {
    console.log("results", results);
    throw dvError.badRequest("Invalid results");
  }

  let updatedStory = await updateStory({
    id: story.id,
    content: updatedContent,
  });

  // then continue the story to the next prompt for user input
  const nextPrompt = await buildSystemPrompt({
    story,
    scenario: "narrate",
  });
  const narrateResults = await generator(nextPrompt, "");
  const validatedNarrateResults = validateResults({
    results: narrateResults,
    scenario: "narrate",
  });
  if (
    !validatedNarrateResults ||
    validatedNarrateResults.scenario !== "narrate"
  ) {
    console.log("results", results);
    throw dvError.badRequest("Invalid results");
  }
  const { characters, nextCharacter, userPrompt } = validatedNarrateResults;

  updatedContent = `${updatedStory.content}\n${validatedNarrateResults.text}`;
  updatedStory = await updateStory({ id: story.id, content: updatedContent });

  return { characters, nextCharacter, userPrompt, updatedStory };
};
