-- AlterTable
ALTER TABLE `stockhistory` MODIFY `action` ENUM('CREATED', 'ADDED', 'EDITED', 'SALE') NOT NULL;
