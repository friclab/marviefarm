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
exports.OrderDetailsService = exports.UpdateOrderDetailDto = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const display_name_1 = require("../../common/display-name");
const update_order_detail_dto_1 = require("./dto/update-order-detail.dto");
Object.defineProperty(exports, "UpdateOrderDetailDto", { enumerable: true, get: function () { return update_order_detail_dto_1.UpdateOrderDetailDto; } });
const includeRelations = {
    article: true,
    fabric: true,
    modeltypeSexSize: {
        include: {
            size: true,
            modeltypeSex: { include: { modeltype: true, sex: true } },
        },
    },
};
function toResponse(d) {
    return {
        id: d.id,
        orderHeaderId: d.orderHeaderId,
        articleId: d.articleId,
        fabricId: d.fabricId,
        modeltypeSexSizeId: d.modeltypeSexSizeId,
        quantity: d.quantity,
        note: d.note,
        article: {
            id: d.article.id,
            name: d.article.name,
            description: d.article.description,
            displayName: (0, display_name_1.joinDisplay)([d.article.name, d.article.description]),
        },
        fabric: d.fabric
            ? {
                id: d.fabric.id,
                code: d.fabric.code,
                description: d.fabric.description,
                price: d.fabric.price !== null ? Number(d.fabric.price) : null,
                displayName: (0, display_name_1.joinDisplay)([d.fabric.code, d.fabric.description]),
            }
            : null,
        modeltypeSexSize: d.modeltypeSexSize
            ? {
                id: d.modeltypeSexSize.id,
                size: { id: d.modeltypeSexSize.size.id, code: d.modeltypeSexSize.size.code },
                modeltypeSex: {
                    id: d.modeltypeSexSize.modeltypeSex.id,
                    modeltype: {
                        id: d.modeltypeSexSize.modeltypeSex.modeltype.id,
                        code: d.modeltypeSexSize.modeltypeSex.modeltype.code,
                    },
                    sex: {
                        id: d.modeltypeSexSize.modeltypeSex.sex.id,
                        code: d.modeltypeSexSize.modeltypeSex.sex.code,
                    },
                },
            }
            : null,
    };
}
let OrderDetailsService = class OrderDetailsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.orderDetail.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: includeRelations,
                orderBy: { id: 'desc' },
            }),
            this.prisma.orderDetail.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.orderDetail.findUnique({ where: { id }, include: includeRelations });
        if (!row)
            throw new common_1.NotFoundException(`OrderDetail ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        await this.assertOrderHeaderExists(dto.orderHeaderId);
        await this.assertArticleExists(dto.articleId);
        if (dto.fabricId !== undefined)
            await this.assertFabricExists(dto.fabricId);
        if (dto.modeltypeSexSizeId !== undefined)
            await this.assertSizeExists(dto.modeltypeSexSizeId);
        const row = await this.prisma.orderDetail.create({ data: dto, include: includeRelations });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.articleId !== undefined)
            await this.assertArticleExists(dto.articleId);
        if (dto.fabricId !== undefined)
            await this.assertFabricExists(dto.fabricId);
        if (dto.modeltypeSexSizeId !== undefined)
            await this.assertSizeExists(dto.modeltypeSexSizeId);
        const row = await this.prisma.orderDetail.update({
            where: { id },
            data: dto,
            include: includeRelations,
        });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.orderDetail.delete({ where: { id } });
    }
    async batchCreate(dto) {
        await this.assertOrderHeaderExists(dto.orderHeaderId);
        await this.assertArticleExists(dto.articleId);
        await this.assertFabricExists(dto.fabricId);
        const validItems = dto.items.filter(item => item.quantity > 0);
        if (validItems.length === 0)
            return { created: 0 };
        await this.prisma.$transaction(async (tx) => {
            for (const item of validItems) {
                await tx.orderDetail.create({
                    data: {
                        orderHeaderId: dto.orderHeaderId,
                        articleId: dto.articleId,
                        fabricId: dto.fabricId,
                        modeltypeSexSizeId: item.modeltypeSexSizeId,
                        quantity: item.quantity,
                        note: dto.note,
                    },
                });
            }
        });
        return { created: validItems.length };
    }
    async getFabricOptions(articleId) {
        const fabrics = await this.prisma.fabric.findMany({
            where: { articleId },
            orderBy: { code: 'asc' },
        });
        return fabrics.map(f => ({
            id: f.id,
            code: f.code,
            description: f.description,
            price: f.price !== null ? Number(f.price) : null,
            displayName: (0, display_name_1.joinDisplay)([f.code, f.description]),
        }));
    }
    async getSizeOptions(articleId) {
        const article = await this.prisma.article.findUnique({
            where: { id: articleId },
            select: { modeltypesSexId: true },
        });
        if (!article)
            throw new common_1.NotFoundException(`Article ${articleId} not found`);
        const sizes = await this.prisma.modeltypeSexSize.findMany({
            where: { modeltypeSexId: article.modeltypesSexId },
            include: { size: true },
            orderBy: { size: { code: 'asc' } },
        });
        return sizes.map(s => ({
            modeltypeSexSizeId: s.id,
            sizeId: s.sizeId,
            sizeCode: s.size.code,
        }));
    }
    async getArticleInfo(articleId) {
        const article = await this.prisma.article.findUnique({
            where: { id: articleId },
            select: { id: true, name: true },
        });
        if (!article)
            throw new common_1.NotFoundException(`Article ${articleId} not found`);
        const fabrics = await this.prisma.fabric.findMany({
            where: { articleId },
            orderBy: { code: 'asc' },
        });
        return {
            articleId: article.id,
            name: article.name,
            fabrics: fabrics.map(f => ({
                id: f.id,
                code: f.code,
                description: f.description,
                price: f.price !== null ? Number(f.price) : null,
                displayName: (0, display_name_1.joinDisplay)([f.code, f.description]),
            })),
        };
    }
    async assertOrderHeaderExists(id) {
        const exists = await this.prisma.orderHeader.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`OrderHeader ${id} does not exist`);
    }
    async assertArticleExists(id) {
        const exists = await this.prisma.article.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Article ${id} does not exist`);
    }
    async assertFabricExists(id) {
        const exists = await this.prisma.fabric.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Fabric ${id} does not exist`);
    }
    async assertSizeExists(id) {
        const exists = await this.prisma.modeltypeSexSize.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`ModeltypeSexSize ${id} does not exist`);
    }
};
exports.OrderDetailsService = OrderDetailsService;
exports.OrderDetailsService = OrderDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderDetailsService);
//# sourceMappingURL=order-details.service.js.map