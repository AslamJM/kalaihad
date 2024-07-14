/*
  Warnings:

  - You are about to drop the column `sale_id` on the `stockhistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_sale_id_fkey`;

-- DropForeignKey
ALTER TABLE `paymenthistory` DROP FOREIGN KEY `PaymentHistory_payment_id_fkey`;

-- DropForeignKey
ALTER TABLE `paymenthistoryedit` DROP FOREIGN KEY `PaymentHistoryEdit_history_id_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `Sale_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `saledetails` DROP FOREIGN KEY `SaleDetails_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `saledetails` DROP FOREIGN KEY `SaleDetails_sale_id_fkey`;

-- DropForeignKey
ALTER TABLE `stockhistory` DROP FOREIGN KEY `StockHistory_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `stockhistoryedit` DROP FOREIGN KEY `StockHistoryEdit_history_id_fkey`;

-- DropIndex
DROP INDEX `StockHistory_product_id_sale_id_key` ON `stockhistory`;

-- AlterTable
ALTER TABLE `stockhistory` DROP COLUMN `sale_id`;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_name_key` ON `Customer`(`name`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockHistory` ADD CONSTRAINT `StockHistory_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockHistoryEdit` ADD CONSTRAINT `StockHistoryEdit_history_id_fkey` FOREIGN KEY (`history_id`) REFERENCES `StockHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleDetails` ADD CONSTRAINT `SaleDetails_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `Sale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleDetails` ADD CONSTRAINT `SaleDetails_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `Sale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentHistory` ADD CONSTRAINT `PaymentHistory_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `Payment`(`sale_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentHistoryEdit` ADD CONSTRAINT `PaymentHistoryEdit_history_id_fkey` FOREIGN KEY (`history_id`) REFERENCES `PaymentHistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
