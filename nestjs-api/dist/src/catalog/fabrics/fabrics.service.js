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
exports.FabricsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const display_name_1 = require("../../common/display-name");
const includeRelations = {
    article: true,
    dynamicComposition: {
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
        code: row.code,
        description: row.description,
        price: row.price !== null ? Number(row.price) : null,
        articleId: row.articleId,
        dynamicCompositionId: row.dynamicCompositionId,
        displayName: (0, display_name_1.joinDisplay)([row.code, row.description]),
        article: {
            id: row.article.id,
            name: row.article.name,
            description: row.article.description,
            displayName: (0, display_name_1.joinDisplay)([row.article.name, row.article.description]),
        },
        dynamicComposition: row.dynamicComposition
            ? {
                id: row.dynamicComposition.id,
                code: row.dynamicComposition.code,
                description: row.dynamicComposition.description,
                displayName: (0, display_name_1.joinDisplay)([row.dynamicComposition.code, row.dynamicComposition.description]),
                materials: row.dynamicComposition.materials.map(m => ({
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
let FabricsService = class FabricsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit, articleId) {
        const where = articleId !== undefined ? { articleId } : undefined;
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.fabric.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where,
                include: includeRelations,
                orderBy: [{ article: { name: 'asc' } }, { code: 'asc' }],
            }),
            this.prisma.fabric.count({ where }),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.fabric.findUnique({ where: { id }, include: includeRelations });
        if (!row)
            throw new common_1.NotFoundException(`Fabric ${id} not found`);
        return toResponse(row);
    }
    async findByArticle(articleId) {
        const rows = await this.prisma.fabric.findMany({
            where: { articleId },
            include: includeRelations,
            orderBy: { code: 'asc' },
        });
        return rows.map(toResponse);
    }
    async create(dto) {
        await this.assertArticleExists(dto.articleId);
        if (dto.dynamicCompositionId !== undefined) {
            await this.assertDynamicCompositionExists(dto.dynamicCompositionId);
        }
        const row = await this.prisma.fabric.create({ data: dto, include: includeRelations });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.articleId !== undefined)
            await this.assertArticleExists(dto.articleId);
        if (dto.dynamicCompositionId !== undefined) {
            await this.assertDynamicCompositionExists(dto.dynamicCompositionId);
        }
        const row = await this.prisma.fabric.update({
            where: { id },
            data: dto,
            include: includeRelations,
        });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        const detailCount = await this.prisma.orderDetail.count({ where: { fabricId: id } });
        if (detailCount > 0) {
            throw new common_1.ConflictException(`Cannot delete: ${detailCount} order detail(s) reference this fabric`);
        }
        await this.prisma.fabric.delete({ where: { id } });
    }
    async assertArticleExists(id) {
        const exists = await this.prisma.article.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Article ${id} does not exist`);
    }
    async assertDynamicCompositionExists(id) {
        const exists = await this.prisma.dynamicComposition.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`DynamicComposition ${id} does not exist`);
    }
};
exports.FabricsService = FabricsService;
exports.FabricsService = FabricsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FabricsService);
//# sourceMappingURL=fabrics.service.js.map