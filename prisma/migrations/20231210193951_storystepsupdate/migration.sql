/*
  Warnings:

  - The primary key for the `StoryStep` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `StoryStep` table. All the data in the column will be lost.
  - You are about to drop the column `storyStepId` on the `StoryStepVote` table. All the data in the column will be lost.
  - Added the required column `storyStepNum` to the `StoryStepVote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StoryStepVote" DROP CONSTRAINT "StoryStepVote_storyStepId_fkey";

-- AlterTable
ALTER TABLE "StoryStep" DROP CONSTRAINT "StoryStep_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "StoryStep_pkey" PRIMARY KEY ("serialNumber", "storyId");

-- AlterTable
ALTER TABLE "StoryStepVote" DROP COLUMN "storyStepId",
ADD COLUMN     "storyStepNum" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StoryStepVote" ADD CONSTRAINT "StoryStepVote_storyStepNum_id_fkey" FOREIGN KEY ("storyStepNum", "id") REFERENCES "StoryStep"("serialNumber", "storyId") ON DELETE CASCADE ON UPDATE CASCADE;
