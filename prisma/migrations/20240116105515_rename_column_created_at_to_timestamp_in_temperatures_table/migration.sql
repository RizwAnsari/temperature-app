/*
  Warnings:

  - You are about to drop the column `updated_at` on the `temperatures` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `temperatures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "temperatures" DROP COLUMN "updated_at",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
