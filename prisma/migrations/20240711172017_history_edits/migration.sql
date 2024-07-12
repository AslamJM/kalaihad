-- CreateTable
CREATE TABLE `StockHistoryEdit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `history_id` INTEGER NOT NULL,
    `type` ENUM('INC', 'DEC') NOT NULL,
    `amount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentHistoryEdit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `history_id` INTEGER NOT NULL,
    `type` ENUM('INC', 'DEC') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StockHistoryEdit` ADD CONSTRAINT `StockHistoryEdit_history_id_fkey` FOREIGN KEY (`history_id`) REFERENCES `StockHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentHistoryEdit` ADD CONSTRAINT `PaymentHistoryEdit_history_id_fkey` FOREIGN KEY (`history_id`) REFERENCES `PaymentHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
