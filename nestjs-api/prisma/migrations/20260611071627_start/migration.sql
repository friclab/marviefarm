-- AlterTable
ALTER TABLE `materials` MODIFY `composition_usage` ENUM('FIXED', 'DYNAMIC', 'BOTH') NOT NULL DEFAULT 'BOTH';
