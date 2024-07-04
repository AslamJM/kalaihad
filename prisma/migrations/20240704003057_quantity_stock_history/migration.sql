/*
  Warnings:

  - You are about to drop the column `remarks` on the `stockhistory` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `StockHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockhistory` DROP COLUMN `remarks`,
    ADD COLUMN `quantity` INTEGER NOT NULL;
