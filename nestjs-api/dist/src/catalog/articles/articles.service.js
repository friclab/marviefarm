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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const display_name_1 = require("../../common/display-name");
const includeRelations = {
    modeltypesSex: { include: { modeltype: true, sex: true } },
    projects: { include: { project: true } },
    fixedComposition: {
        include: {
            materials: {
                include: { material: { include: { unitmeasurement: true } } },
                orderBy: { material: { code: 'asc' } },
            },
        },
    },
};
function toResponse(row) {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        modeltypesSexId: row.modeltypesSexId,
        fixedCompositionId: row.fixedCompositionId,
        displayName: (0, display_name_1.joinDisplay)([row.name, row.description]),
        modeltypesSex: {
            id: row.modeltypesSex.id,
            modeltypeId: row.modeltypesSex.modeltypeId,
            sexId: row.modeltypesSex.sexId,
            displayName: (0, display_name_1.joinDisplay)([row.modeltypesSex.modeltype.code, row.modeltypesSex.sex.code]),
            modeltype: {
                id: row.modeltypesSex.modeltype.id,
                code: row.modeltypesSex.modeltype.code,
                description: row.modeltypesSex.modeltype.description,
            },
            sex: { id: row.modeltypesSex.sex.id, code: row.modeltypesSex.sex.code },
        },
        projects: row.projects.map(p => ({ id: p.project.id, name: p.project.name })),
        fixedComposition: row.fixedComposition
            ? {
                id: row.fixedComposition.id,
                code: row.fixedComposition.code,
                description: row.fixedComposition.description,
                displayName: (0, display_name_1.joinDisplay)([row.fixedComposition.code, row.fixedComposition.description]),
                materials: row.fixedComposition.materials.map(m => ({
                    id: m.id,
                    materialId: m.materialId,
                    quantity: Number(m.quantity),
                    material: {
                        id: m.material.id,
                        code: m.material.code,
                        description: m.material.description,
                        displayName: m.material.code,
                        unitmeasurement: m.material.unitmeasurement
                            ? {
                                id: m.material.unitmeasurement.id,
                                code: m.material.unitmeasurement.code,
                                description: m.material.unitmeasurement.description,
                            }
                            : null,
                    },
                })),
            }
            : null,
    };
}
function isJpeg(buf) {
    return buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}
let ArticlesService = class ArticlesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.article.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: includeRelations,
                orderBy: { name: 'asc' },
            }),
            this.prisma.article.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.article.findUnique({ where: { id }, include: includeRelations });
        if (!row)
            throw new common_1.NotFoundException(`Article ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        const { projectIds, fixedCompositionId, ...fields } = dto;
        await this.assertModeltypesSexExists(fields.modeltypesSexId);
        if (projectIds?.length)
            await this.assertProjectsExist(projectIds);
        if (fixedCompositionId)
            await this.assertFixedCompositionExists(fixedCompositionId);
        const row = await this.prisma.article.create({
            data: {
                ...fields,
                fixedCompositionId: fixedCompositionId ?? null,
                projects: {
                    create: (projectIds ?? []).map(id => ({ projectId: id })),
                },
            },
            include: includeRelations,
        });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        const { projectIds, fixedCompositionId, ...fields } = dto;
        if (fields.modeltypesSexId !== undefined) {
            await this.assertModeltypesSexExists(fields.modeltypesSexId);
        }
        if (projectIds !== undefined && projectIds.length > 0)
            await this.assertProjectsExist(projectIds);
        if (fixedCompositionId)
            await this.assertFixedCompositionExists(fixedCompositionId);
        const row = await this.prisma.article.update({
            where: { id },
            data: {
                ...fields,
                ...(fixedCompositionId !== undefined && { fixedCompositionId: fixedCompositionId ?? null }),
                ...(projectIds !== undefined && {
                    projects: {
                        deleteMany: {},
                        create: projectIds.map(pid => ({ projectId: pid })),
                    },
                }),
            },
            include: includeRelations,
        });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        const detailCount = await this.prisma.orderDetail.count({ where: { articleId: id } });
        if (detailCount > 0) {
            throw new common_1.ConflictException(`Cannot delete: ${detailCount} order detail(s) reference this article`);
        }
        await this.prisma.$transaction([
            this.prisma.articleProject.deleteMany({ where: { articleId: id } }),
            this.prisma.fabric.deleteMany({ where: { articleId: id } }),
            this.prisma.article.delete({ where: { id } }),
        ]);
    }
    async updateImage(id, buffer) {
        await this.findOne(id);
        if (!isJpeg(buffer)) {
            throw new common_1.BadRequestException('Only JPEG images are accepted');
        }
        await this.prisma.article.update({ where: { id }, data: { image: buffer } });
    }
    async getImage(id) {
        const row = await this.prisma.article.findUnique({
            where: { id },
            select: { image: true },
        });
        if (!row)
            throw new common_1.NotFoundException(`Article ${id} not found`);
        if (!row.image)
            throw new common_1.NotFoundException(`Article ${id} has no image`);
        return Buffer.from(row.image);
    }
    async assertModeltypesSexExists(id) {
        const exists = await this.prisma.modeltypeSex.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`ModeltypeSex ${id} does not exist`);
    }
    async assertFixedCompositionExists(id) {
        const exists = await this.prisma.fixedComposition.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`FixedComposition ${id} does not exist`);
    }
    async assertProjectsExist(ids) {
        const found = await this.prisma.project.findMany({
            where: { id: { in: ids } },
            select: { id: true },
        });
        if (found.length !== ids.length) {
            const missing = ids.filter(id => !found.some(f => f.id === id));
            throw new common_1.BadRequestException(`Project IDs not found: ${missing.join(', ')}`);
        }
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map