-- AlterTable
ALTER TABLE "Cooperation" ADD COLUMN     "files" TEXT[] DEFAULT ARRAY[]::TEXT[];
