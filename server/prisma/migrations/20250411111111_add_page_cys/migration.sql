-- CreateTable
CREATE TABLE "CYS" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'UA',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "CYS_pkey" PRIMARY KEY ("id")
);
