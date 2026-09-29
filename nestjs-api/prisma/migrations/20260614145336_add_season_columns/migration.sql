-- AlterTable
ALTER TABLE `articles` ADD COLUMN `project_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `collections` ADD COLUMN `type` VARCHAR(191) NULL,
    ADD COLUMN `year` INTEGER NULL;

-- AlterTable
ALTER TABLE `materials` ADD COLUMN `collection_id` INTEGER NULL,
    MODIFY `composition_usage` ENUM('FIXED', 'DYNAMIC', 'BOTH') NOT NULL DEFAULT 'BOTH';

-- AlterTable
ALTER TABLE `materialtypes` ADD COLUMN `seasonal` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `collection_id` INTEGER NULL;

-- ---------------------------------------------------------------------------
-- Backfill (non-destructive): collapse the de-facto 1:N HABTM pivots into the
-- new direct FK columns, and seed seasonality. Verified zero multi-membership
-- and zero orphans on the live data, so these are lossless.
-- FK constraints are added later, per-entity, when the Prisma relations are
-- declared (kept out of this migration to avoid Prisma drift detection).
-- ---------------------------------------------------------------------------

-- projects.collection_id <- collections_projects
UPDATE `projects` p
  JOIN `collections_projects` cp ON cp.`project_id` = p.`id`
  SET p.`collection_id` = cp.`collection_id`;

-- articles.project_id <- articles_projects
UPDATE `articles` a
  JOIN `articles_projects` ap ON ap.`article_id` = a.`id`
  SET a.`project_id` = ap.`project_id`;

-- Mark fabrics (TXT) as the only seasonal material type; MERC/LAV stay perennial.
UPDATE `materialtypes` SET `seasonal` = 1 WHERE `code` = 'TXT';

-- Seasonal materials -> the (single) existing collection.
UPDATE `materials` m
  JOIN `materials_materialtypes` mm ON mm.`material_id` = m.`id`
  JOIN `materialtypes` mt ON mt.`id` = mm.`materialtype_id`
  SET m.`collection_id` = (SELECT `id` FROM `collections` ORDER BY `id` LIMIT 1)
  WHERE mt.`seasonal` = 1;

-- Label the existing collection from its name ("SS 2027").
UPDATE `collections` SET `type` = 'SS', `year` = 2027 WHERE `name` = 'SS 2027';
