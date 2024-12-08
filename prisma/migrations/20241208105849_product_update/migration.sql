/*
  Warnings:

  - You are about to drop the column `inStock` on the `products` table. All the data in the column will be lost.
  - Added the required column `inventoryCount` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "inStock",
ADD COLUMN     "inventoryCount" INTEGER NOT NULL;
