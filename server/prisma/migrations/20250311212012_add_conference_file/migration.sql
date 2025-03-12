-- CreateTable
CREATE TABLE "ConferenceFile" (
    "id" TEXT NOT NULL,
    "files" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "language" "Language" NOT NULL DEFAULT 'UA',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ConferenceFile_pkey" PRIMARY KEY ("id")
);
