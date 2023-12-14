import {
  Prisma,
  Narrator as DBNarrator,
  Character,
  StoryTemplate,
  StoryStatus,
} from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";
import {
  StoryCharacter,
  StoryCharacterQueryType,
  createCharacter,
  storyCharacterQuery,
} from "./character.server";
import { getStoryTemplate } from "./storyTemplate.server";

export type CreateStoryInput = {
  title: string;
  summary: string;
  authorId: string;
  isActive?: boolean;
  version?: number;
  characters?: { name: string; description: string }[];
  templateId?: string;
  imageUrl?: string | null;
};

export const createStory = async ({
  title,
  summary,
  authorId,
  isActive = false,
  version = 1,
  characters = [],
  templateId,
  imageUrl = null,
}: CreateStoryInput) => {
  const story = await prisma.story.create({
    data: {
      title,
      summary,
      content: "",
      authorId,
      isActive,
      version,
      storyTemplateId: templateId,
    },
  });
  const newCharacters = await Promise.all(
    characters.map((character) =>
      createCharacter({
        ...character,
        storyId: story.id,
      })
    )
  );
  return story;
};

export const createStoryFromTemplate = async ({
  templateId,
  authorId,
}: {
  templateId: string;
  authorId: string;
}) => {
  const template = await getStoryTemplate({ id: templateId });
  if (!template) throw dvError.notFound("Template not found");
  const latestVersionFromTemplate = await prisma.story.findFirst({
    where: {
      OR: [
        { storyTemplateId: templateId },
        { title: template.title, authorId },
      ],
    },
    orderBy: {
      version: "desc",
    },
    select: {
      version: true,
    },
  });
  const version = latestVersionFromTemplate
    ? latestVersionFromTemplate.version + 1
    : 1;
  return await createStory({
    title: template.title,
    summary: template.summary || "",
    authorId,
    isActive: false,
    version,
    templateId,
    imageUrl: template?.imageUrl || null,
  });
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
  status: StoryStatus;
}) => {
  const story = await prisma.story.update({
    where: {
      id,
    },
    data: {
      status,
    },
    include: {
      characters: storyCharacterQuery,
      narrator: true,
    },
  });
  return story;
};

export const getStoryStatus = async (id: string) => {
  const story = await prisma.story.findUnique({
    where: {
      id,
    },
    select: {
      status: true,
    },
  });
  return story?.status;
};

export const updateStory = async ({
  id,
  title,
  summary,
  content,
  isActive,
}: {
  id: string;
  title?: string;
  summary?: string;
  content?: string;
  isActive?: boolean;
}): Promise<StoryData> => {
  const data: Prisma.StoryUpdateInput = {
    ...(title && { title }),
    ...(summary && { summary }),
    ...(content && { content }),
    ...(isActive && { isActive }),
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
    (character) =>
      !story.characters.find((c) => {
        // convert names to lowercase and remove whitespace
        const cName = c.name.toLowerCase().replace(/\s/g, "");
        const characterName = character.name.toLowerCase().replace(/\s/g, "");
        return cName === characterName;
      })
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
    include: {
      characters: storyCharacterQuery,
      narrator: true,
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

export const getNextCharacterInStory = ({ story }: { story: StoryData }) => {
  const nextCharacterRecord = story.characters.find(
    (character) => character.name === story.nextCharacter
  );
  if (!nextCharacterRecord) {
    return {
      characterId: null,
      characterName: null,
      characterUsername: null,
      characterUserId: null,
    };
  }
  const characterUsername = nextCharacterRecord.rolePlayer?.name || "ai";
  const characterUserId = nextCharacterRecord.rolePlayer?.id || null;
  return {
    characterId: nextCharacterRecord.id,
    characterName: story.nextCharacter,
    characterUsername,
    characterUserId,
  };
};

export const duplicateStoryForUser = async ({
  storyId,
  userId,
}: {
  storyId: string;
  userId: string;
}) => {
  const story = await prisma.story.findUnique({
    where: {
      id: storyId,
    },
    include: {
      characters: storyCharacterQuery,
      narrator: true,
    },
  });
  if (!story) {
    return null;
  }
  const newCharacters = story.characters.map((character) => ({
    name: character.name,
    description: character.description || "",
  }));
  const newStory = await createStory({
    title: story.title,
    summary: story.summary,
    authorId: userId,
    isActive: false,
    version: story.version + 1,
    characters: newCharacters,
  });

  return await updateStory({
    id: newStory.id,
    content: story.content,
  });
};

export const updateImageInStory = async ({
  storyId,
  imageUrl,
}: {
  storyId: string;
  imageUrl: string | null;
}) => {
  const story = await prisma.story.update({
    where: {
      id: storyId,
    },
    data: {
      imageUrl,
    },
  });
  return story;
};
