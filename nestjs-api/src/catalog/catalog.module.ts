import { Module } from '@nestjs/common';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';
import { CollectionsController } from './collections/collections.controller';
import { CollectionsService } from './collections/collections.service';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { FabricsController } from './fabrics/fabrics.controller';
import { FabricsService } from './fabrics/fabrics.service';

@Module({
  controllers: [
    ProjectsController,
    CollectionsController,
    ArticlesController,
    FabricsController,
  ],
  providers: [
    ProjectsService,
    CollectionsService,
    ArticlesService,
    FabricsService,
  ],
  exports: [CollectionsService, ArticlesService, FabricsService],
})
export class CatalogModule {}
