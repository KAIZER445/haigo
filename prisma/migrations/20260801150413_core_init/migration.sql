-- CreateTable
CREATE TABLE "Core" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortenedUrl" TEXT NOT NULL,
    "activeStatus" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Core_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Core_originalUrl_key" ON "Core"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Core_shortenedUrl_key" ON "Core"("shortenedUrl");
