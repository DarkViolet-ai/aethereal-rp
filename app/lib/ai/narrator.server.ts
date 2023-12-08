import {
  createNarrator,
  getNarrator,
  createStory,
  getStory,
} from "~/lib/db/db.server";
import type { Narrator } from "@prisma/client";
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

export const narrate = async ({
  narrator,
  newInput,
  generator,
}: {
  narrator: Narrator;
  newInput: string;
}) => {
  const story = await getStory({ id: narrator.storyId });
  if (!story) {
    throw dvError.notFound("Story not found");
  }

  return { narrator: updatedNarrator, story };
};
