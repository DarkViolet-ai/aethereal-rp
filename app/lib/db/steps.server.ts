import { Prisma, Narrator as DBNarrator, Character } from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";
import { submitLog } from "../queue/queues";

// todo: move the auto increment to a db trigger
export const getNextStepNum = async (storyId: string) => {
  const step = await prisma.storyStep.findFirst({
    where: {
      storyId,
    },
    select: {
      serialNumber: true,
    },
    orderBy: {
      serialNumber: "desc",
    },
  });
  return step ? step.serialNumber + 1 : 1;
};

export const createStep = async ({
  storyId,
  content,
  characterName,
  userId,
  characterPrompt,
  userInput = "",
}: {
  storyId: string;
  content: string;
  characterName?: string;
  userId?: string | null;
  characterPrompt?: string;
  userInput?: string;
}) => {
  const step = await prisma.storyStep.create({
    data: {
      storyId,
      serialNumber: await getNextStepNum(storyId),
      content,
      characterName,
      userId,
      characterPrompt,
      userInput,
      isAI: userId ? false : true,
      isNarrator: characterName ? false : true,
    },
  });
  submitLog({
    type: "INFO",
    message: `Created step ${step.serialNumber} of ${storyId}`,
  });
  return step;
};

export const createNarratorStep = async ({
  storyId,
  content,
  lastInput,
}: {
  storyId: string;
  content: string;
  lastInput?: string;
}) => {
  return await createStep({
    storyId,
    content,
    userInput: lastInput,
  });
};

export const createUserCharacterStep = async ({
  storyId,
  content,
  characterName,
  userId,
  characterPrompt,
}: {
  storyId: string;
  content: string;
  characterName: string;
  userId: string;
  characterPrompt: string;
}) => {
  return await createStep({
    storyId,
    content,
    characterName,
    userId,
    characterPrompt,
  });
};

export const createCharacterEditStep = async ({
  storyId,
  content,
  characterName,
  userId,
  characterPrompt,
  userInput = "",
}: {
  storyId: string;
  content: string;
  characterName: string;
  userId: string | null;
  characterPrompt: string;
  userInput?: string;
}) => {
  return await createStep({
    storyId,
    content,
    characterName,
    userId,
    characterPrompt: "edit: " + characterPrompt,
    userInput,
  });
};

export const createAICharacterStep = async ({
  storyId,
  content,
  characterName,
  characterPrompt,
}: {
  storyId: string;
  content: string;
  characterName: string;
  characterPrompt: string;
}) => {
  return await createStep({
    storyId,
    content,
    characterName,
    characterPrompt,
  });
};
