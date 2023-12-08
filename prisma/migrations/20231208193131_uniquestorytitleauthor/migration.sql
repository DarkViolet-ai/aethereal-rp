/*
  Warnings:

  - A unique constraint covering the columns `[title,authorId]` on the table `Story` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Story_title_authorId_key" ON "Story"("title", "authorId");
