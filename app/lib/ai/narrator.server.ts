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
import { buildSystemPrompt } from "~/lib/ai/systemPrompt";

export const beginStory = async ({
  title,
  summary,
  authorId,
  narratorInstructions,
  generator,
}: {
  title: string;
  summary: string;
  authorId: string;
  narratorInstructions: NarratorInstructions;
  generator: (systemPrompt: string, input: string) => Promise<string>;
}) => {
  const initStory = await createStory({
    title,
    summary,
    authorId,
    isActive: true,
  });

  const narrator = createNarrator({
    storyId: initStory.id,
    instructions: narratorInstructions,
  });

  const story = await getStory({ id: initStory.id });
  if (!story) throw dvError.internalServerError("Story creation failed");
  const systemPrompt = await buildSystemPrompt({
    story,
    scenario: "initialize",
  });
  const results = (await generator(systemPrompt, "begin story")) as string;
  const validatedResults = validateResults({
    results: results,
    scenario: "initialize",
  });

  return { story, narrator };
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
    scenario: z.literal("initialize"),
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
  scenario: "integrate" | "characters" | "narrate" | "initialize";
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
