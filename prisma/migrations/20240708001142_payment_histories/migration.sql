-- AlterTable
ALTER TABLE `payment` ADD COLUMN `payment_status` ENUM('PENDING', 'PAID') NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE `PaymentHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `payment_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentHistory` ADD CONSTRAINT `PaymentHistory_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `Payment`(`sale_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
