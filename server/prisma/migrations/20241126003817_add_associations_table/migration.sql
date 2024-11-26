-- CreateTable
CREATE TABLE "Associations" (
    "id" TEXT NOT NULL,
    "organizations" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "language" "Language" NOT NULL DEFAULT 'UA',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Associations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CooperationAgreements" (
    "id" TEXT NOT NULL,
    "foreignUniversities" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "language" "Language" NOT NULL DEFAULT 'UA',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "CooperationAgreements_pkey" PRIMARY KEY ("id")
);
