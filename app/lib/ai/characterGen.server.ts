import { string } from "zod";
import type { StoryData } from "~/lib/db/story.server";
import { submitError } from "../queue/queues";

export const generateCharacterOutput = async ({
  story,
  characterInstructions,
  generator,
  maxPromptLength = 13000,
  maxOutputLength = 500,
}: {
  story: StoryData;
  characterInstructions: string;
  generator: (systemPrompt: string, input: string) => Promise<string>;
  maxPromptLength?: number;
  maxOutputLength?: number;
}) => {
  const characterPrompt = await buildCharacterPrompt({
    story,
    characterInstructions,
    maxLength: maxPromptLength,
  });
  if (!characterPrompt) return null;
  const results = await generator(characterPrompt, story?.prompt || "");
  return results;
};

export const buildCharacterPrompt = async ({
  story,
  characterInstructions,
  maxLength = 13000,
}: {
  story: StoryData;
  characterInstructions: string;
  maxLength?: number;
}) => {
  const { content, characters, nextCharacter, prompt } = story;
  const character = characters.find(
    (character) => character.name === nextCharacter
  );
  if (!character) {
    await submitError({ message: `character not found: ${nextCharacter}` });
    return null;
  }
  const characterPromptPrefix = `
  ${characterInstructions}\n 
  CharacterName: ${character.name}:\n CharacterDescription: ${character.description}\n
  story title: ${story.title}\n story:`;
  const availableLength =
    maxLength - characterPromptPrefix.length - (prompt?.length || 0);
  const characterPrompt = `${characterPromptPrefix}${content.slice(
    -availableLength
  )}`;
  return characterPrompt;
};
