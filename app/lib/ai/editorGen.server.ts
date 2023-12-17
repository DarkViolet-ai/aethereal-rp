import { StoryCharacter } from "../db/character.server";
import { createUserCharacterEditStep } from "../db/steps.server";
import {
  StoryData,
  getNextCharacterInStory,
  updateStory,
} from "../db/story.server";
import { submitError } from "../queue/queues";

export const generateEditedContent = async ({
  newInput,
  story,
  editorInstructions,
  generator,
  maxPromptLength = 15000,
  maxOutputLength = 500,
}: {
  newInput: string;
  story: StoryData;
  editorInstructions: ({
    story,
    character,
    maxLength,
  }: {
    story: StoryData;
    character: StoryCharacter;
    maxLength?: number;
  }) => string;
  generator: (systemPrompt: string, input: string) => Promise<string>;
  maxPromptLength?: number;
  maxOutputLength?: number;
}) => {
  const editorPrompt = await buildEditorPrompt({
    story,
    editorInstructions,
    maxLength: maxPromptLength,
  });
  if (!editorPrompt) return null;
  const results = await generator(editorPrompt, newInput);
  const { characterUserId: userId } = getNextCharacterInStory({ story });
  if (!userId) {
    await submitError({ message: "no user id found" });
  } else {
    await createUserCharacterEditStep({
      storyId: story.id,
      characterName: story.nextCharacter!,
      content: results,
      characterPrompt: story.prompt!,
      userId,
    });
  }
  const newContent = story.content + "\n" + results + "\n";
  const updatedStory = await updateStory({
    ...story,
    content: newContent,
  });
  return updatedStory;
};

export const buildEditorPrompt = async ({
  story,
  editorInstructions,
  maxLength = 15000,
}: {
  story: StoryData;
  editorInstructions: ({
    story,
    character,
    maxLength,
  }: {
    story: StoryData;
    character: StoryCharacter;
    maxLength?: number;
  }) => string;
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
  const editorPrompt = `
  ${editorInstructions({ story, character, maxLength })}\n`;
  return editorPrompt;
};
