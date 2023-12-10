import { Prisma, Narrator as DBNarrator, Character } from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";
import {
  StoryCharacterQueryType,
  storyCharacterQuery,
} from "./character.server";

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
}: GetStoryInput): Promise<StoryData | null> => {
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
      characters: storyCharacterQuery,
      narrator: true,
    },
  });
  return story;
};

export type StoryData = Prisma.StoryGetPayload<{
  include: {
    characters: StoryCharacterQueryType;
    narrator: true;
  };
}>;

export const updateStoryStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const story = await prisma.story.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
  return story;
};

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
}): Promise<StoryData> => {
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
      characters: storyCharacterQuery,
      narrator: true,
    },
  });
  return story;
};

export const updateCharactersInStory = async ({
  story,
  characters,
}: {
  story: StoryData;
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

export const setNextCharacterInStory = async ({
  storyId,
  nextCharacterName,
  nextPrompt,
}: {
  storyId: string;
  nextCharacterName: string;
  nextPrompt: string;
}) => {
  const story = await prisma.story.update({
    where: {
      id: storyId,
    },
    data: {
      nextCharacter: nextCharacterName,
      prompt: nextPrompt,
      lastInput: null,
    },
  });
  return story;
};

export const setLastInputInStory = async ({
  storyId,
  lastInput,
}: {
  storyId: string;
  lastInput: string;
}) => {
  const story = await prisma.story.update({
    where: {
      id: storyId,
    },
    data: {
      lastInput,
    },
  });
  return story;
};

export const getActiveStories = async (): Promise<StoryData[]> => {
  const stories = await prisma.story.findMany({
    where: {
      isActive: true,
    },
    include: {
      characters: storyCharacterQuery,
      narrator: true,
    },
  });
  return stories;
};
