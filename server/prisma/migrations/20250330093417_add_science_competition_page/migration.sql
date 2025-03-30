-- CreateTable
CREATE TABLE "ScienceCompetition" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "toDate" TIMESTAMPTZ(3),
    "type" "ConferenceType" NOT NULL DEFAULT 'COMPETITION',
    "country" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "files" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "language" "Language" NOT NULL DEFAULT 'UA',
    "isStudent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ScienceCompetition_pkey" PRIMARY KEY ("id")
);
