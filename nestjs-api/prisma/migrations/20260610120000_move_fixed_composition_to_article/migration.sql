-- Move fixedcomposition_id from fabrics to articles
-- Fixed composition is shared by all fabric variants of the same article

-- Drop FK and column from fabrics
ALTER TABLE `fabrics` DROP FOREIGN KEY `fabrics_fixedcomposition_id_fkey`;
ALTER TABLE `fabrics` DROP COLUMN `fixedcomposition_id`;

-- Add column and FK to articles
ALTER TABLE `articles` ADD COLUMN `fixedcomposition_id` INTEGER NULL;
ALTER TABLE `articles` ADD CONSTRAINT `articles_fixedcomposition_id_fkey` FOREIGN KEY (`fixedcomposition_id`) REFERENCES `fixedcompositions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
