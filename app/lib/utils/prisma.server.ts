import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient | undefined;
}

prisma = global.__db__ || new PrismaClient();

export { prisma };
