-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_storyId_fkey";

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "status" TEXT;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
