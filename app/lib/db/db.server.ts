import { Prisma, Narrator as DBNarrator, Character } from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";
import { inView } from "framer-motion";

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
  version?: number;
};

export const createStory = async ({
  title,
  summary,
  authorId,
  isActive = true,
  version = 1,
}: CreateStoryInput) => {
  const story = await prisma.story.create({
    data: {
      title,
      summary,
      content: "",
      authorId,
      isActive,
      version,
    },
  });
  return story;
};

export type GetStoryInput = {
  id?: string;
  title?: string;
  authorId?: string;
  version?: number;
};

export const getLatestVersionofStory = async ({
  title,
  authorId,
}: {
  title?: string;
  authorId?: string;
}) => {
  const story = await prisma.story.findFirst({
    where: {
      title,
      authorId,
    },
    orderBy: {
      version: "desc",
    },
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

export const getStory = async ({
  id,
  title,
  authorId,
  version = 1,
}: GetStoryInput): Promise<StoryContent | null> => {
  if (!id && !title && !authorId)
    throw dvError.badRequest("Missing required parameters");
  const where = id
    ? { id }
    : ({
        title_authorId_version: { title, authorId, version },
      } as Prisma.StoryWhereUniqueInput);
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

export const updateStory = async ({
  id,
  title,
  summary,
  content,
}: {
  id: string;
  title?: string;
  summary?: string;
  content?: string;
}): Promise<StoryContent> => {
  const data: Prisma.StoryUpdateInput = {
    ...(title && { title }),
    ...(summary && { summary }),
    ...(content && { content }),
  };
  const story = await prisma.story.update({
    where: {
      id,
    },
    data,
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
  return story;
};

export const updateCharactersInStory = async ({
  story,
  characters,
}: {
  story: StoryContent;
  characters: Character[];
}) => {
  // first find any characters that are not in story.characters
  const newCharacters = characters.filter(
    (character) => !story.characters.find((c) => c.name === character.name)
  );
  // add these new characters to the story
  const addedCharacters = await prisma.character.createMany({
    data: newCharacters.map((character) => ({
      ...character,
      storyId: story.id,
    })),
  });
};

export const __updateCharactersInStory = async ({
  id,
  characters,
}: {
  id: string;
  characters: Character[];
}) => {
  const story = await prisma.story.update({
    where: {
      id,
    },
    data: {
      characters: {
        upsert: characters.map((character) => ({
          where: {
            name_storyId: {
              name: character.name,
              storyId: id,
            },
          },
          update: { ...character, storyId: id },
          create: { ...character, storyId: id },
        })),
      },
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
  return story;
};

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
  initialize: string;
  integrate: string;
  narrate: string;
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
