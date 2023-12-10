import {
  Prisma,
  Narrator as DBNarrator,
  Character,
  LogType,
} from "@prisma/client";
import { prisma } from "~/lib/utils/prisma.server";
import { dvError } from "../utils/dvError";

export const createLogEntry = async ({
  type,
  message,
  stack,
}: {
  type: LogType;
  message: string;
  stack?: string;
}) => {
  const logEntry = await prisma.log.create({
    data: {
      type,
      message,
      stack,
    },
  });
  return logEntry;
};
