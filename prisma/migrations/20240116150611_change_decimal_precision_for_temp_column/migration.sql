/*
  Warnings:

  - You are about to alter the column `temp` on the `temperatures` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(3,2)`.

*/
-- AlterTable
ALTER TABLE "temperatures" ALTER COLUMN "temp" SET DATA TYPE DECIMAL(6,3);
