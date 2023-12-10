import { Prisma, Narrator as DBNarrator, Character } from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";

export type StoryCharacterQueryType = {
  select: {
    rolePlayer: {
      select: {
        id: true;
        username: true;
      };
    };
    name: true;
    description: true;
  };
};

export const storyCharacterQuery = {
  select: {
    rolePlayer: {
      select: {
        id: true,
        username: true,
      },
    },
    name: true,
    description: true,
  },
};

export type StoryCharacter =
  Prisma.CharacterGetPayload<StoryCharacterQueryType>;

export const createCharacter = async ({
  name,
  storyId,
  description,
}: {
  name: string;
  storyId: string;
  description: string;
}) => {
  const character = await prisma.character.create({
    data: {
      name,
      description,
      storyId,
    },
  });
  return character;
};

export type OpenCharacterView = Prisma.CharacterGetPayload<{
  include: {
    story: {
      select: {
        title: true;
        summary: true;
      };
    };
  };
}>;

export const getActiveOpenCharacters = async (): Promise<
  OpenCharacterView[]
> => {
  const characters = await prisma.character.findMany({
    where: {
      isActive: true,
      rolePlayerId: null,
    },
    include: {
      story: {
        select: {
          title: true,
          summary: true,
        },
      },
    },
  });
  return characters;
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
