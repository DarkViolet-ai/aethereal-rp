import {
  createNarrator,
  getNarrator,
  createStory,
  getStory,
  StoryContent,
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
  scenario,
}: {
  narrator: Narrator;
  story: StoryContent;
  scenario: "integrate" | "narrate"
}) => {
  const narratorInstructions = narrator.instructions;
  const storySummary = story.summary;
  const storyTitle = story.title;
  const characters = story.characters.reduce((acc, curr) => {

    const { name, description } = curr;
    if(!name) throw dvError.badRequest("Character must have a name");
    acc[name] = description;
    return acc;
  }, {} as Record<string, string | null>);

  const characterString = JSON.stringify({ characters });



  const systemPrompt = `${narratorInstructions} title:${storyTitle}
   \n summary: ${storySummary}\n characters: ${characterString}\n
   ${story.content}`;

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
