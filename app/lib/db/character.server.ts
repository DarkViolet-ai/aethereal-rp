import {
  Prisma,
  Narrator as DBNarrator,
  Character,
  StoryStatus,
} from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";
import { updateStory } from "./story.server";
import { submitStatus } from "../queue/queues";

export type StoryCharacterQueryType = {
  select: {
    rolePlayer: {
      select: {
        id: true;
        name: true;
      };
    };
    name: true;
    description: true;
    id: true;
  };
};

export const storyCharacterQuery = {
  select: {
    rolePlayer: {
      select: {
        id: true,
        name: true,
      },
    },
    id: true,
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
    include: {
      story: {
        select: {
          isActive: true,
        },
      },
    },
  });
  if (!character.story.isActive) {
    await updateStory({
      id: character.storyId,
      isActive: true,
    });
    await submitStatus({
      storyId: character.storyId,
      status: StoryStatus.USER,
    });
  }
  return character;
};

export const removeRolePlayer = async ({
  characterId,
}: {
  characterId: string;
}) => {
  const character = await prisma.character.update({
    where: {
      id: characterId,
    },
    data: {
      rolePlayerId: null,
    },
  });
  return character;
};
