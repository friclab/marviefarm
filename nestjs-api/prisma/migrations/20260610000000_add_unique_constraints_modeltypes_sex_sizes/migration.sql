-- Prevent duplicate (modeltype, sex) combinations
CREATE UNIQUE INDEX `modeltypes_sexes_modeltype_id_sex_id_key` ON `modeltypes_sexes`(`modeltype_id`, `sex_id`);

-- Prevent duplicate (modeltypes_sex, size) assignments
CREATE UNIQUE INDEX `modeltypessexes_sizes_modeltypessex_id_size_id_key` ON `modeltypessexes_sizes`(`modeltypessex_id`, `size_id`);
