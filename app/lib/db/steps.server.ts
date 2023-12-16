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
}: {
  storyId: string;
  content: string;
  characterName?: string;
  userId?: string;
  characterPrompt?: string;
}) => {
  const step = await prisma.storyStep.create({
    data: {
      storyId,
      serialNumber: await getNextStepNum(storyId),
      content,
      characterName,
      userId,
      characterPrompt,
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
}: {
  storyId: string;
  content: string;
}) => {
  return await createStep({
    storyId,
    content,
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

export const createUserCharacterEditStep = async ({
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
    characterPrompt: "edit: " + characterPrompt,
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
