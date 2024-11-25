-- CreateTable
CREATE TABLE "Documents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "files" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "language" "Language" NOT NULL DEFAULT 'UA',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);
