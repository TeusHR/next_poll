-- CreateTable
CREATE TABLE "DirectionFilter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "innovationId" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'UA',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "DirectionFilter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DirectionFilter_name_key" ON "DirectionFilter"("name");

-- AddForeignKey
ALTER TABLE "DirectionFilter" ADD CONSTRAINT "DirectionFilter_innovationId_fkey" FOREIGN KEY ("innovationId") REFERENCES "Innovation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
