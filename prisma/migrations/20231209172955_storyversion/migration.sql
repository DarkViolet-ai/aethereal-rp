/*
  Warnings:

  - A unique constraint covering the columns `[title,authorId,version]` on the table `Story` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Story_title_authorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Story_title_authorId_version_key" ON "Story"("title", "authorId", "version");
