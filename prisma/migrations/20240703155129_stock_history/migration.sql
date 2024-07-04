-- CreateTable
CREATE TABLE `StockHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` ENUM('CREATED', 'ADDED', 'SALE') NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StockHistory` ADD CONSTRAINT `StockHistory_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
