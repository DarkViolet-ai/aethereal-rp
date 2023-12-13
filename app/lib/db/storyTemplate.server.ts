import { Prisma, Narrator as DBNarrator, Character } from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";

export const getStoryTemplate = async ({ id }: { id: string }) => {
  const storyTemplate = await prisma.storyTemplate.findUnique({
    where: {
      id,
    },
  });
  return storyTemplate;
};

export const createStoryTemplate = async (
  data: Prisma.StoryTemplateCreateInput
) => {
  const storyTemplate = await prisma.storyTemplate.create({
    data,
  });
  return storyTemplate;
};

export const createTemplateFromStory = async (storyId: string) => {
  const story = await prisma.story.findUnique({
    where: {
      id: storyId,
    },
    select: {
      title: true,
      summary: true,
    },
  });
  if (!story) throw dvError.notFound("Story not found");
  const storyTemplate = await createStoryTemplate(story);
};

export const getAllTemplates = async () => {
  const templates = await prisma.storyTemplate.findMany();
  return templates;
};

export const setTemplateImage = async ({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl: string;
}) => {
  const template = await prisma.storyTemplate.update({
    where: {
      id,
    },
    data: {
      imageUrl,
    },
  });
  return template;
};
