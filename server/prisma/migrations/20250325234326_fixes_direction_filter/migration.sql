/*
  Warnings:

  - You are about to drop the column `innovationId` on the `DirectionFilter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DirectionFilter" DROP CONSTRAINT "DirectionFilter_innovationId_fkey";

-- AlterTable
ALTER TABLE "DirectionFilter" DROP COLUMN "innovationId";

-- CreateTable
CREATE TABLE "InnovationDirectionFilter" (
    "innovationId" TEXT NOT NULL,
    "directionFilterId" TEXT NOT NULL,

    CONSTRAINT "InnovationDirectionFilter_pkey" PRIMARY KEY ("innovationId","directionFilterId")
);

-- AddForeignKey
ALTER TABLE "InnovationDirectionFilter" ADD CONSTRAINT "InnovationDirectionFilter_innovationId_fkey" FOREIGN KEY ("innovationId") REFERENCES "Innovation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InnovationDirectionFilter" ADD CONSTRAINT "InnovationDirectionFilter_directionFilterId_fkey" FOREIGN KEY ("directionFilterId") REFERENCES "DirectionFilter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
