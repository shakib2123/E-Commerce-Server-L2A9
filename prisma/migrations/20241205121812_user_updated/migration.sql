/*
  Warnings:

  - You are about to drop the column `isBlacklisted` on the `shops` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `FollowedShop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FollowedShop" DROP CONSTRAINT "FollowedShop_shopId_fkey";

-- DropForeignKey
ALTER TABLE "FollowedShop" DROP CONSTRAINT "FollowedShop_userEmail_fkey";

-- AlterTable
ALTER TABLE "shops" DROP COLUMN "isBlacklisted",
ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "FollowedShop";

-- CreateTable
CREATE TABLE "followed_shops" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "followed_shops_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "followed_shops" ADD CONSTRAINT "followed_shops_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followed_shops" ADD CONSTRAINT "followed_shops_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
