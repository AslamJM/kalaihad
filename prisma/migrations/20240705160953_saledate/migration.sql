/*
  Warnings:

  - Added the required column `sale_date` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sale` ADD COLUMN `sale_date` DATETIME(3) NOT NULL;
