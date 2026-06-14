-- ---------------------------------------------------------------------------
-- Destructive final phase: drop the HABTM pivots now that membership lives on
-- the direct FKs (articles.project_id, projects.collection_id), fully backfilled
-- in 20260614145336_add_season_columns. Gated on a verified zero-orphan check:
--   SELECT COUNT(*) FROM articles WHERE project_id IS NULL      => 0
--   SELECT COUNT(*) FROM projects WHERE collection_id IS NULL   => 0
-- ---------------------------------------------------------------------------

-- DropTable
DROP TABLE `articles_projects`;

-- DropTable
DROP TABLE `collections_projects`;
