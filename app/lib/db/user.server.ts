import { Prisma, Narrator as DBNarrator, Character } from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";
import {
  StoryCharacterQueryType,
  removeRolePlayer,
  storyCharacterQuery,
} from "./character.server";
import { duplicateStoryForUser } from "./story.server";

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

export const getUserStories = async (
  id: string
): Promise<{
  stories: StorySummaryData[];
  activeStories: StorySummaryData[];
}> => {
  const activeStories = await prisma.story.findMany({
    where: {
      characters: {
        some: {
          rolePlayer: {
            id,
          },
        },
      },
    },
    select: {
      characters: storyCharacterQuery,
      id: true,
      title: true,
      imageUrl: true,
      summary: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const stories = await prisma.story.findMany({
    where: {
      authorId: id,
    },
    select: {
      characters: storyCharacterQuery,
      id: true,
      title: true,
      summary: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return { stories, activeStories };
};

export type StorySummaryData = Prisma.StoryGetPayload<{
  select: {
    id: true;
    title: true;
    summary: true;
    characters: StoryCharacterQueryType;
    imageUrl: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export const userLeaveStory = async ({
  storyId,
  characterName,
  userId,
}: {
  storyId: string;
  characterName: string;
  userId: string;
}) => {
  const character = await prisma.character.findUnique({
    where: {
      name_storyId: {
        storyId,
        name: characterName,
      },
    },
    include: {
      rolePlayer: true,
    },
  });
  if (!character) {
    return null;
  }
  if (character.rolePlayerId !== userId) {
    return null;
  }
  await removeRolePlayer({
    characterId: character.id,
  });
  await duplicateStoryForUser({
    storyId,
    userId,
  });
  return true;
};
