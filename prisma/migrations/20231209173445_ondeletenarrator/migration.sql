-- DropForeignKey
ALTER TABLE "Narrator" DROP CONSTRAINT "Narrator_storyId_fkey";

-- AddForeignKey
ALTER TABLE "Narrator" ADD CONSTRAINT "Narrator_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
