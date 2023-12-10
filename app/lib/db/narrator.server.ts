import { Prisma, Narrator as DBNarrator, Character } from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";

export enum NarratorInstructionType {
  initialize = "initialize",
  integrate = "integrate",
  narrate = "narrate",
}

export type NarratorInstructions = {
  [key in NarratorInstructionType]: string;
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
