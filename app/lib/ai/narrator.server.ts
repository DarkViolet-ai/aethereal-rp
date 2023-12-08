import {
  createNarrator,
  getNarrator,
  createStory,
  getStory,
} from "~/lib/db/db.server";
import type { Narrator, Story } from "@prisma/client";
import { dvError } from "~/lib/utils/dvError";

export const beginStory = async ({
  title,
  summary,
  authorId,
  narratorInstructions,
}: {
  title: string;
  summary: string;
  authorId: string;
  narratorInstructions: string;
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
  narrator,
  story,
}: {
  narrator: Narrator;
  story: Story;
}) => {
  const narratorInstructions = narrator.instructions;
  const storySummary = story.summary;
  const characterDescriptions = story.characters.map((character) => {
    

  const systemPrompt = `${narratorInstructions} ${storySummary}`;

  return systemPrompt;
})

export const narrate = async ({
  story,
  newInput,
  generator,
}: {
  story: Story;
  newInput: string;
  generator:(systemPrompt: string, input: string) => Promise<string>;
  
}) => {



  return { narrator: updatedNarrator, story };
};
