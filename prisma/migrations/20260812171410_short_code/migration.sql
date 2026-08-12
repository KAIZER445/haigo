/*
  Warnings:

  - You are about to drop the column `shortenedUrl` on the `Core` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shortCode]` on the table `Core` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortCode` to the `Core` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Core_shortenedUrl_key";

-- AlterTable
ALTER TABLE "Core" DROP COLUMN "shortenedUrl",
ADD COLUMN     "shortCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Core_shortCode_key" ON "Core"("shortCode");
