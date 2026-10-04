/*
  Warnings:

  - Made the column `phone` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Customer_businessId_idx";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "phone" SET NOT NULL;
