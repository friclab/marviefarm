-- AlterTable: classify each material for the fixed/dynamic composition grids.
-- Existing rows default to BOTH (visible in every composition grid).
ALTER TABLE `materials`
    ADD COLUMN IF NOT EXISTS `composition_usage` ENUM('FIXED', 'DYNAMIC', 'BOTH') NOT NULL DEFAULT 'BOTH';

-- AlterTable: optional human-readable description for sexes.
-- IF NOT EXISTS because some databases already received this column out-of-band.
ALTER TABLE `sexes`
    ADD COLUMN IF NOT EXISTS `description` VARCHAR(191) NULL;
