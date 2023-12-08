import { Prisma, Narrator as DBNarrator } from "@prisma/client";
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

export const getStory = async ({
  id,
  title,
  authorId,
}: GetStoryInput): Promise<StoryContent | null> => {
  if (!id && !title && !authorId)
    throw dvError.badRequest("Missing required parameters");
  const where = id
    ? { id }
    : ({ title_authorId: { title, authorId } } as Prisma.StoryWhereUniqueInput);
  const story = await prisma.story.findUnique({
    where,
    include: {
      characters: {
        select: {
          rolePlayer: {
            select: {
              id: true,
              name: true,
            },
          },
          name: true,
          description: true,
        },
      },
      narrator: true,
    },
  });
  return story;
};

export type StoryContent = Prisma.StoryGetPayload<{
  include: {
    characters: {
      select: {
        name: true;
        description: true;
        rolePlayer: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    };
    narrator: true;
  };
}>;

export const getActiveStories = async (): Promise<StoryContent[]> => {
  const stories = await prisma.story.findMany({
    where: {
      isActive: true,
    },
    include: {
      characters: {
        include: {
          rolePlayer: {
            select: {
              id: true,
              name: true,
            },
          },
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

export type NarratorInstructions = {
  integrate?: string;
  narrate?: string;
};

export type Narrator = DBNarrator & { instructions: NarratorInstructions };

export const createNarrator = async ({
  storyId,
  name = "Dark Violet",
  instructions,
}: {
  storyId: string;
  name?: string;
  instructions: NarratorInstructions;
}): Promise<Narrator> => {
  const narrator = await prisma.narrator.create({
    data: {
      storyId,
      name,
      instructions,
    },
  });
  return narrator as Narrator;
};

export const getNarrator = async (id: string): Promise<Narrator> => {
  const narrator = await prisma.narrator.findUnique({
    where: {
      id,
    },
  });
  return narrator as Narrator;
};
