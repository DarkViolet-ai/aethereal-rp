import { Prisma } from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";

export const createUser = async (data: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const getUserStories = async (id: string) => {
  const stories = await prisma.story.findMany({
    where: {
      authorId: id,
    },
  });
  return stories;
};

export type CreateStoryInput = {
  title: string;
  summary: string;
  authorId: string;
  isActive?: boolean;
};

export const createStory = async ({
  title,
  summary,
  authorId,
  isActive = true,
}: CreateStoryInput) => {
  const story = await prisma.story.create({
    data: {
      title,
      summary,
      content: "",
      authorId,
      isActive,
    },
  });
  return story;
};

export type GetStoryInput = {
  id?: string;
  title?: string;
  authorId?: string;
};

export const getStory = async ({ id, title, authorId }: GetStoryInput) => {
  if (!id && !title && !authorId)
    throw dvError.badRequest("Missing required parameters");
  const where = id
    ? { id }
    : ({ title_authorId: { title, authorId } } as Prisma.StoryWhereUniqueInput);
  const story = await prisma.story.findUnique({
    where,
    include: {
      characters: {
        include: {
          rolePlayer: true,
        },
      },
      narrator: true,
    },
  });
  return story;
};

export type StoryContent

export const getActiveStories = async () => {
  const stories = await prisma.story.findMany({
    where: {
      isActive: true,
    },
    include: {
      characters: {
        include: {
          rolePlayer: true,
        },
      },
      narrator: true,
    },
  });
  return stories;
};

export const createCharacter = async ({
  name,
  storyId,
  summary,
}: {
  name: string;
  storyId: string;
  summary: string;
}) => {
  const character = await prisma.character.create({
    data: {
      name,
      summary,
      storyId,
    },
  });
  return character;
};

export const getCharacter = async (id: string) => {
  const character = await prisma.character.findUnique({
    where: {
      id,
    },
  });
  return character;
};

export const assignRolePlayer = async ({
  characterId,
  userId,
}: {
  characterId: string;
  userId: string;
}) => {
  const character = await prisma.character.update({
    where: {
      id: characterId,
    },
    data: {
      rolePlayerId: userId,
    },
  });
  return character;
};

export const createNarrator = async ({
  storyId,
  name = "Dark Violet",
  instructions,
}: {
  storyId: string;
  name?: string;
  instructions: string;
}) => {
  const narrator = await prisma.narrator.create({
    data: {
      storyId,
      name,
      instructions,
    },
  });
  return narrator;
};

export const getNarrator = async (id: string) => {
  const narrator = await prisma.narrator.findUnique({
    where: {
      id,
    },
  });
  return narrator;
};
