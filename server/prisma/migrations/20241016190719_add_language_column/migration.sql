-- CreateEnum
CREATE TYPE "Language" AS ENUM ('UA', 'EN');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "Conference" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "Consulting" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "Cooperation" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "DIGAM" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "Innovation" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "InternationalProject" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "Laboratory" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "LaboratoryDevelopment" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "ResearchWork" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "ScienceSchool" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "StudentScience" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';

-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'UA';
