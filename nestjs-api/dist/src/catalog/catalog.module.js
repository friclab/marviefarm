"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogModule = void 0;
const common_1 = require("@nestjs/common");
const projects_controller_1 = require("./projects/projects.controller");
const projects_service_1 = require("./projects/projects.service");
const collections_controller_1 = require("./collections/collections.controller");
const collections_service_1 = require("./collections/collections.service");
const articles_controller_1 = require("./articles/articles.controller");
const articles_service_1 = require("./articles/articles.service");
const fabrics_controller_1 = require("./fabrics/fabrics.controller");
const fabrics_service_1 = require("./fabrics/fabrics.service");
let CatalogModule = class CatalogModule {
};
exports.CatalogModule = CatalogModule;
exports.CatalogModule = CatalogModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            projects_controller_1.ProjectsController,
            collections_controller_1.CollectionsController,
            articles_controller_1.ArticlesController,
            fabrics_controller_1.FabricsController,
        ],
        providers: [
            projects_service_1.ProjectsService,
            collections_service_1.CollectionsService,
            articles_service_1.ArticlesService,
            fabrics_service_1.FabricsService,
        ],
        exports: [collections_service_1.CollectionsService, articles_service_1.ArticlesService, fabrics_service_1.FabricsService],
    })
], CatalogModule);
//# sourceMappingURL=catalog.module.js.map