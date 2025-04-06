-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "files" TEXT[],
    "roomNumber" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "supervisor" TEXT[],
    "language" "Language" NOT NULL DEFAULT 'UA',
    "date" TIMESTAMPTZ(3) NOT NULL,
    "toDate" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
