/*
  Warnings:

  - A unique constraint covering the columns `[name,storyId]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Character_name_storyId_key" ON "Character"("name", "storyId");
