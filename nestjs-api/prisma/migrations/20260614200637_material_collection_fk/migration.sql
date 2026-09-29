-- AlterTable
ALTER TABLE `materials` MODIFY `composition_usage` ENUM('FIXED', 'DYNAMIC', 'BOTH') NOT NULL DEFAULT 'BOTH';

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `materials_collection_id_fkey` FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
