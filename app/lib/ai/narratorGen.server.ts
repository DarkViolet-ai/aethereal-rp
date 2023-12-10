import { createNarrator, getNarrator } from "~/lib/db/narrator.server";

import {
  createStory,
  getStory,
  updateStory,
  updateCharactersInStory,
  setNextCharacterInStory,
} from "~/lib/db/story.server";

import type { Character, Story } from "@prisma/client";
import type { Narrator, NarratorInstructions } from "~/lib/db/db.server";
import { dvError } from "~/lib/utils/dvError";
import { json } from "@remix-run/node";
import { set, z } from "zod";
import { buildSystemPrompt } from "~/lib/ai/systemPrompt";
import internal from "node:stream";
import type { StoryData } from "~/lib/db/story.server";

export const continueStory = async ({
  story,
  narratorInstructions,
  generator,
  newInput,
}: {
  story: StoryData;
  narratorInstructions: NarratorInstructions;
  generator: (systemPrompt: string, input: string) => Promise<string>;
  newInput?: string;
}) => {
  //console.log("initStory", initStory);
  if (!story.narrator) {
    story.narrator = await createNarrator({
      storyId: story.id,
      instructions: narratorInstructions,
    });
  }
  console.log("story", story);
  if (!story.content) {
    return await initializeStory({ story, generator });
  }
  if (!story.lastInput) return { story };
  return await narrate({ story, newInput: story.lastInput, generator });
};

const initializeStory = async ({
  story,
  generator,
}: {
  story: StoryData;
  generator: (systemPrompt: string, input: string) => Promise<string>;
}) => {
  const narrator = story.narrator as Narrator;
  const systemPrompt = await buildSystemPrompt({
    story,
    scenario: "initialize",
  });
  const results = (await generator(systemPrompt, "begin story")) as string;
  const validatedResults = validateResults({
    results: results,
    scenario: "initialize",
  });
  if (validatedResults?.scenario !== "initialize") {
    throw dvError.badRequest("Invalid results");
  }
  const { text, prompt, characters, nextCharacter } = validatedResults;
  let updatedContent = `${story.content}\n${validatedResults.text}`;
  let updatedStory = await updateStory({
    id: story.id,
    content: updatedContent || story.content,
  });

  const _characters =
    Object.keys(characters).map(
      (name) =>
        ({
          name,
          description: characters[name].description,
          storyId: story.id,
          isActive: true,
        } as Character)
    ) || [];
  const newCharacters = await updateCharactersInStory({
    story: updatedStory,
    characters: _characters,
  });
  await setNextCharacterInStory({
    storyId: updatedStory.id,
    nextCharacterName: nextCharacter,
    nextPrompt: prompt,
  });

  const _updatedStory = (await getStory({ id: story.id })) as StoryData;
  return { story: _updatedStory };
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
  generator,
}: {
  story: StoryData;
  newInput: string;
  generator: (systemPrompt: string, input: string) => Promise<string>;
}) => {
  const narrator = story.narrator as Narrator;
  if (!narrator) throw dvError.badRequest("Story has no narrator");
  // first integrate the new input into the story

  // then continue the story to the next prompt for user input
  const nextPrompt = await buildSystemPrompt({
    story,
    scenario: "narrate",
  });
  const narrateResults = await generator(nextPrompt, story.lastInput || "");
  const validatedNarrateResults = validateResults({
    results: narrateResults,
    scenario: "narrate",
  });
  if (!validatedNarrateResults) {
    return { story };
  }
  if (validatedNarrateResults?.scenario !== "narrate") {
    throw dvError.badRequest("Invalid results");
  }

  const { characters, nextCharacter, prompt } = validatedNarrateResults;

  const updatedContent = `${story.content}\n${validatedNarrateResults.text}`;
  const _characters =
    Object.keys(characters).map(
      (name) =>
        ({
          name,
          description: characters[name].description,
          storyId: story.id,
          isActive: true,
        } as Character)
    ) || [];

  const newCharacters = await updateCharactersInStory({
    story,
    characters: _characters,
  });
  await setNextCharacterInStory({
    storyId: story.id,
    nextCharacterName: nextCharacter,
    nextPrompt: prompt,
  });
  const updatedStory = await updateStory({
    id: story.id,
    content: updatedContent,
  });

  return { story: updatedStory };
};
