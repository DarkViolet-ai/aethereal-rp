import { Prisma, Narrator as DBNarrator, Character } from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";
import { removeRolePlayer } from "./character.server";
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

export const getUserStories = async (id: string) => {
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
  });

  const stories = await prisma.story.findMany({
    where: {
      authorId: id,
    },
  });
  return { stories, activeStories };
};

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
