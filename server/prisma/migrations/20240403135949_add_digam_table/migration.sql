-- CreateTable
CREATE TABLE "DIGAM" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "organizations" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "foreignUniversities" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "DIGAM_pkey" PRIMARY KEY ("id")
);
