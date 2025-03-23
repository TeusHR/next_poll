-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_publicInformationId_fkey";

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "documentsTemplatesId" TEXT,
ALTER COLUMN "publicInformationId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "DocumentsTemplates" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "files" TEXT[],
    "language" "Language" NOT NULL DEFAULT 'UA',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "DocumentsTemplates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_publicInformationId_fkey" FOREIGN KEY ("publicInformationId") REFERENCES "PublicInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_documentsTemplatesId_fkey" FOREIGN KEY ("documentsTemplatesId") REFERENCES "DocumentsTemplates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
