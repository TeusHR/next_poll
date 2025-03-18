/*
  Warnings:

  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `PublicInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_pageId_fkey";

-- AlterTable
ALTER TABLE "PublicInformation" ADD COLUMN     "files" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Folder";
