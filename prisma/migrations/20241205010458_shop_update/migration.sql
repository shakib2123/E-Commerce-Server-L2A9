/*
  Warnings:

  - You are about to drop the column `blacklisted` on the `shops` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shops" DROP COLUMN "blacklisted",
ADD COLUMN     "isBlacklisted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "lastLogin" SET DEFAULT CURRENT_TIMESTAMP;
