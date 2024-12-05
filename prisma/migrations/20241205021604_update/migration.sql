/*
  Warnings:

  - You are about to drop the `ShopFollower` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShopFollower" DROP CONSTRAINT "ShopFollower_shopId_fkey";

-- DropForeignKey
ALTER TABLE "ShopFollower" DROP CONSTRAINT "ShopFollower_userEmail_fkey";

-- DropTable
DROP TABLE "ShopFollower";

-- CreateTable
CREATE TABLE "FollowedShop" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "FollowedShop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FollowedShop" ADD CONSTRAINT "FollowedShop_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowedShop" ADD CONSTRAINT "FollowedShop_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
