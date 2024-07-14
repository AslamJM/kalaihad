/*
  Warnings:

  - A unique constraint covering the columns `[product_id,sale_id]` on the table `StockHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sale_id` to the `StockHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockhistory` ADD COLUMN `sale_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `StockHistory_product_id_sale_id_key` ON `StockHistory`(`product_id`, `sale_id`);
