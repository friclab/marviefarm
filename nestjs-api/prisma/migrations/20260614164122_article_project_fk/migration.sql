-- AlterTable
ALTER TABLE `materials` MODIFY `composition_usage` ENUM('FIXED', 'DYNAMIC', 'BOTH') NOT NULL DEFAULT 'BOTH';

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
