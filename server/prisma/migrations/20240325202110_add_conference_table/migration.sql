-- CreateEnum
CREATE TYPE "ConferenceType" AS ENUM ('SEMINAR', 'COMPETITION', 'CONFERENCT');

-- CreateTable
CREATE TABLE "Conference" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "type" "ConferenceType" NOT NULL,
    "country" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "files" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("id")
);
