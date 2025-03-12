/*
  Warnings:

  - A unique constraint covering the columns `[language]` on the table `ConferenceFile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConferenceFile_language_key" ON "ConferenceFile"("language");
