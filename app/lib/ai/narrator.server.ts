import {
  createNarrator,
  getNarrator,
  createStory,
  getStory,
  StoryContent,
  updateStory,
  updateCharactersInStory,
} from "~/lib/db/db.server";
import type { Character, Story } from "@prisma/client";
import type { Narrator, NarratorInstructions } from "~/lib/db/db.server";
import { dvError } from "~/lib/utils/dvError";
import { json } from "@remix-run/node";
import { z } from "zod";
import { buildSystemPrompt } from "~/lib/ai/systemPrompt";
import internal from "node:stream";

export const beginStory = async ({
  title,
  summary,
  authorId,
  version,
  narratorInstructions,

  generator,
}: {
  title: string;
  summary: string;
  authorId: string;
  version: number;
  narratorInstructions: NarratorInstructions;
  generator: (systemPrompt: string, input: string) => Promise<string>;
}) => {
  const initStory = await createStory({
    title,
    summary,
    authorId,
    version,
    isActive: true,
  });
  console.log("initStory", initStory);

  const narrator = await createNarrator({
    storyId: initStory.id,
    instructions: narratorInstructions,
  });

  console.log("narrator", narrator);

  const story = await getStory({ id: initStory.id });
  console.log("story", story);
  if (!story) throw dvError.internalServerError("Story creation failed");
  const systemPrompt = await buildSystemPrompt({
    story,
    scenario: "initialize",
  });
  console.log("systemPrompt", systemPrompt);
  const results = (await generator(systemPrompt, "begin story")) as string;
  console.log("results", results);
  const validatedResults = validateResults({
    results: results,
    scenario: "initialize",
  });
  let updatedContent =
    validatedResults?.scenario === "initialize" &&
    `${story.content}\n${validatedResults.text}`;
  let updatedStory = await updateStory({
    id: story.id,
    content: updatedContent || story.content,
  });

  const prompt =
    validatedResults?.scenario === "initialize" && validatedResults?.prompt;

  const characters =
    (validatedResults?.scenario === "initialize" &&
      validatedResults?.characters &&
      Object.keys(validatedResults?.characters).map(
        (name) =>
          ({
            name,
            description: validatedResults?.characters[name].description,
            storyId: story.id,
            isActive: true,
          } as Character)
      )) ||
    [];
  const newCharacters = await updateCharactersInStory({
    story: updatedStory,
    characters,
  });
  updatedStory = (await getStory({ id: story.id })) as StoryContent;
  return { story: updatedStory, narrator, prompt };
};

const expectedResponseSchema = z.discriminatedUnion("scenario", [
  z.object({
    scenario: z.literal("integrate"),
    text: z.string(),
  }),
  z.object({
    scenario: z.literal("narrate"),
    text: z.string(),
    prompt: z.string(),
    characters: z.record(z.object({ description: z.string() })),
    nextCharacter: z.string(),
  }),
  z.object({
    scenario: z.literal("initialize"),
    text: z.string(),
    prompt: z.string(),
    characters: z.record(z.object({ description: z.string() })),
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
  const { characters, nextCharacter, prompt } = validatedNarrateResults;

  updatedContent = `${updatedStory.content}\n${validatedNarrateResults.text}`;
  updatedStory = await updateStory({ id: story.id, content: updatedContent });

  return { characters, nextCharacter, prompt, updatedStory };
};
