/*
  Warnings:

  - Added the required column `discountPrice` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "discountPrice" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "ratingsCount" SET DEFAULT 0;
