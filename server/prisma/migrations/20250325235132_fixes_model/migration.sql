/*
  Warnings:

  - You are about to drop the `InnovationDirectionFilter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InnovationDirectionFilter" DROP CONSTRAINT "InnovationDirectionFilter_directionFilterId_fkey";

-- DropForeignKey
ALTER TABLE "InnovationDirectionFilter" DROP CONSTRAINT "InnovationDirectionFilter_innovationId_fkey";

-- DropTable
DROP TABLE "InnovationDirectionFilter";

-- CreateTable
CREATE TABLE "_DirectionFilterToInnovation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DirectionFilterToInnovation_AB_unique" ON "_DirectionFilterToInnovation"("A", "B");

-- CreateIndex
CREATE INDEX "_DirectionFilterToInnovation_B_index" ON "_DirectionFilterToInnovation"("B");

-- AddForeignKey
ALTER TABLE "_DirectionFilterToInnovation" ADD CONSTRAINT "_DirectionFilterToInnovation_A_fkey" FOREIGN KEY ("A") REFERENCES "DirectionFilter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DirectionFilterToInnovation" ADD CONSTRAINT "_DirectionFilterToInnovation_B_fkey" FOREIGN KEY ("B") REFERENCES "Innovation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
