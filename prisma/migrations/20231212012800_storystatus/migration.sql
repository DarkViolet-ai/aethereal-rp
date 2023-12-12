/*
  Warnings:

  - The `status` column on the `Story` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StoryStatus" AS ENUM ('USER', 'AICHARACTER', 'NARRATOR');

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "status",
ADD COLUMN     "status" "StoryStatus";
