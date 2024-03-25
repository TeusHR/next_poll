/*
  Warnings:

  - Added the required column `updatedAt` to the `Conference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conference" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL;

-- CreateTable
CREATE TABLE "ScienceSchool" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ScienceSchool_pkey" PRIMARY KEY ("id")
);
