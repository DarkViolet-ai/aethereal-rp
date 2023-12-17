import { createNarrator, getNarrator } from "~/lib/db/narrator.server";

import {
  createStory,
  getStory,
  updateStory,
  updateCharactersInStory,
  setNextCharacterInStory,
} from "~/lib/db/story.server";

import type { Character, Story } from "@prisma/client";
import type { Narrator, NarratorInstructions } from "~/lib/db/narrator.server";
import { dvError } from "~/lib/utils/dvError";
import { json } from "@remix-run/node";
import { set, z } from "zod";
import { buildSystemPrompt } from "~/lib/ai/systemPrompt";
import internal from "node:stream";
import type { StoryData } from "~/lib/db/story.server";
import { redis } from "../utils/redis.server";

const retryKey = (storyId: string) => `retry:${storyId}`;
const MAX_RETRIES = 5;

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
}): Promise<{ story: StoryData; newContent: string }> => {
  //console.log("initStory", initStory);
  if (!story.narrator) {
    story.narrator = await createNarrator({
      storyId: story.id,
      instructions: narratorInstructions,
    });
  }
  console.log("story", story.title);
  if (!story.content) {
    console.log("initializing story");
    return await initializeStory({ story, generator });
  }
  if (!story.lastInput) return { story, newContent: "" };
  console.log("generating narration");
  return await narrate({ story, generator });
};

const initializeStory = async ({
  story,
  generator,
}: {
  story: StoryData;
  generator: (systemPrompt: string, input: string) => Promise<string>;
}): Promise<{ story: StoryData; newContent: string }> => {
  const narrator = story.narrator as Narrator;
  const systemPrompt = await buildSystemPrompt({
    story,
    scenario: "initialize",
  });
  const results = (await generator(systemPrompt, "begin story")) as string;

  const validatedResults = await validateOrNull({
    story,
    results,
    scenario: "initialize",
  });
  if (!validatedResults || validatedResults.scenario !== "initialize") {
    return initializeStory({ story, generator });
  }

  let updatedContent = `${story.content}\n${validatedResults.text}`;
  let updatedStory = await updateStory({
    id: story.id,
    content: updatedContent || story.content,
  });

  const { characters, nextCharacter, prompt, text } = validatedResults;

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
  return { story: _updatedStory, newContent: text };
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
    characters: z.record(z.object({ description: z.string() })).optional(),
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

export const validateOrNull = async ({
  story,
  results,
  scenario,
}: {
  story: StoryData;
  results: string;
  scenario: "integrate" | "characters" | "narrate" | "initialize";
}): Promise<ExpectedResponseSchema | null> => {
  try {
    const validatedResults = validateResults({ results, scenario });
    if (!validatedResults) throw dvError.badRequest("Invalid results");
    if (validatedResults.scenario !== scenario)
      throw dvError.badRequest("Invalid results");
    if (
      validatedResults.scenario === "initialize" &&
      !validatedResults.characters
    )
      throw dvError.badRequest("Invalid results");
    if (
      validatedResults.scenario === "initialize" ||
      validatedResults.scenario === "narrate"
    ) {
      const storyCharacterNames = story.characters.map(
        (character) => character.name
      );
      const validatedCharacterNames =
        (validatedResults.characters &&
          Object.keys(validatedResults.characters)) ||
        [];
      // see if validatedResults.nextCharacter is in the set of storyCharacterNames + validatedCharacterNames
      const nextCharacterName = validatedResults.nextCharacter;
      if (!nextCharacterName) throw dvError.badRequest("Invalid results");
      if (
        !storyCharacterNames.includes(nextCharacterName) &&
        !validatedCharacterNames.includes(nextCharacterName)
      )
        throw dvError.badRequest("Invalid results");
    }
    await redis.del(retryKey(story.id));
    return validatedResults as ExpectedResponseSchema;
  } catch (e) {
    console.log(e);
    console.log("results", results);
    const count = await redis.incr(retryKey(story.id));
    if (count > MAX_RETRIES) {
      throw dvError.badRequest("Too many retries");
    }
    return null;
  }
};

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
  generator: (systemPrompt: string, input: string) => Promise<string>;
}): Promise<{ story: StoryData; newContent: string }> => {
  const narrator = story.narrator as Narrator;
  if (!narrator) throw dvError.badRequest("Story has no narrator");
  // first integrate the new input into the story

  // then continue the story to the next prompt for user input
  const nextPrompt = await buildSystemPrompt({
    story,
    scenario: "narrate",
  });
  console.log("nextPrompt", { nextPrompt, lastInput: story.lastInput });
  const narrateResults = await generator(nextPrompt, story.lastInput || "");
  const validatedNarrateResults = await validateOrNull({
    story,
    results: narrateResults,
    scenario: "narrate",
  });
  if (
    !validatedNarrateResults ||
    validatedNarrateResults.scenario !== "narrate"
  ) {
    return await narrate({ story, generator });
  }

  const { characters, nextCharacter, prompt, text } = validatedNarrateResults;

  const updatedContent = `${story.content}\n${text}\n`;
  const _characters =
    (characters &&
      Object.keys(characters).map(
        (name) =>
          ({
            name,
            description: characters[name].description,
            storyId: story.id,
            isActive: true,
          } as Character)
      )) ||
    [];

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

  return { story: updatedStory, newContent: text };
};
