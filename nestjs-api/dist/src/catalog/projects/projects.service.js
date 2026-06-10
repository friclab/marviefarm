"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const includeRelations = {
    articles: { include: { article: true } },
    collections: { include: { collection: true } },
};
function toResponse(row) {
    return {
        id: row.id,
        name: row.name,
        displayName: row.name,
        articles: row.articles.map(a => ({
            id: a.article.id,
            name: a.article.name,
            displayName: a.article.name,
        })),
        collections: row.collections.map(c => ({
            id: c.collection.id,
            name: c.collection.name,
        })),
    };
}
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.project.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: includeRelations,
                orderBy: { name: 'asc' },
            }),
            this.prisma.project.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.project.findUnique({ where: { id }, include: includeRelations });
        if (!row)
            throw new common_1.NotFoundException(`Project ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        const { articleIds, collectionIds, ...fields } = dto;
        if (articleIds?.length)
            await this.assertArticlesExist(articleIds);
        if (collectionIds?.length)
            await this.assertCollectionsExist(collectionIds);
        const row = await this.prisma.project.create({
            data: {
                ...fields,
                articles: {
                    create: (articleIds ?? []).map(id => ({ articleId: id })),
                },
                collections: {
                    create: (collectionIds ?? []).map(id => ({ collectionId: id })),
                },
            },
            include: includeRelations,
        });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        const { articleIds, collectionIds, ...fields } = dto;
        if (articleIds !== undefined && articleIds.length > 0)
            await this.assertArticlesExist(articleIds);
        if (collectionIds !== undefined && collectionIds.length > 0) {
            await this.assertCollectionsExist(collectionIds);
        }
        const row = await this.prisma.project.update({
            where: { id },
            data: {
                ...fields,
                ...(articleIds !== undefined && {
                    articles: {
                        deleteMany: {},
                        create: articleIds.map(aid => ({ articleId: aid })),
                    },
                }),
                ...(collectionIds !== undefined && {
                    collections: {
                        deleteMany: {},
                        create: collectionIds.map(cid => ({ collectionId: cid })),
                    },
                }),
            },
            include: includeRelations,
        });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.$transaction([
            this.prisma.articleProject.deleteMany({ where: { projectId: id } }),
            this.prisma.collectionProject.deleteMany({ where: { projectId: id } }),
            this.prisma.project.delete({ where: { id } }),
        ]);
    }
    async assertArticlesExist(ids) {
        const found = await this.prisma.article.findMany({
            where: { id: { in: ids } },
            select: { id: true },
        });
        if (found.length !== ids.length) {
            const missing = ids.filter(id => !found.some(f => f.id === id));
            throw new common_1.BadRequestException(`Article IDs not found: ${missing.join(', ')}`);
        }
    }
    async assertCollectionsExist(ids) {
        const found = await this.prisma.collection.findMany({
            where: { id: { in: ids } },
            select: { id: true },
        });
        if (found.length !== ids.length) {
            const missing = ids.filter(id => !found.some(f => f.id === id));
            throw new common_1.BadRequestException(`Collection IDs not found: ${missing.join(', ')}`);
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map