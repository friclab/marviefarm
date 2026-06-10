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
exports.DynamicCompositionMaterialsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const display_name_1 = require("../../common/display-name");
const includeRelations = {
    dynamicComposition: true,
    material: { include: { unitmeasurement: true } },
};
function toResponse(row) {
    return {
        id: row.id,
        dynamicCompositionId: row.dynamicCompositionId,
        materialId: row.materialId,
        quantity: Number(row.quantity),
        dynamicComposition: {
            id: row.dynamicComposition.id,
            code: row.dynamicComposition.code,
            description: row.dynamicComposition.description,
            displayName: (0, display_name_1.joinDisplay)([row.dynamicComposition.code, row.dynamicComposition.description]),
        },
        material: {
            id: row.material.id,
            code: row.material.code,
            description: row.material.description,
            price: row.material.price !== null ? Number(row.material.price) : null,
            displayName: row.material.code,
            unitmeasurement: row.material.unitmeasurement
                ? {
                    id: row.material.unitmeasurement.id,
                    code: row.material.unitmeasurement.code,
                    description: row.material.unitmeasurement.description,
                }
                : null,
        },
    };
}
let DynamicCompositionMaterialsService = class DynamicCompositionMaterialsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.dynamicCompositionMaterial.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: includeRelations,
                orderBy: [
                    { dynamicComposition: { code: 'asc' } },
                    { material: { code: 'asc' } },
                ],
            }),
            this.prisma.dynamicCompositionMaterial.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.dynamicCompositionMaterial.findUnique({
            where: { id },
            include: includeRelations,
        });
        if (!row)
            throw new common_1.NotFoundException(`DynamicCompositionMaterial ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        await this.assertDynamicCompositionExists(dto.dynamicCompositionId);
        await this.assertMaterialExists(dto.materialId);
        const row = await this.prisma.dynamicCompositionMaterial.create({
            data: {
                dynamicCompositionId: dto.dynamicCompositionId,
                materialId: dto.materialId,
                quantity: dto.quantity,
            },
            include: includeRelations,
        });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.materialId !== undefined)
            await this.assertMaterialExists(dto.materialId);
        const row = await this.prisma.dynamicCompositionMaterial.update({
            where: { id },
            data: dto,
            include: includeRelations,
        });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.dynamicCompositionMaterial.delete({ where: { id } });
    }
    async assertDynamicCompositionExists(id) {
        const exists = await this.prisma.dynamicComposition.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`DynamicComposition ${id} does not exist`);
    }
    async assertMaterialExists(id) {
        const exists = await this.prisma.material.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Material ${id} does not exist`);
    }
};
exports.DynamicCompositionMaterialsService = DynamicCompositionMaterialsService;
exports.DynamicCompositionMaterialsService = DynamicCompositionMaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DynamicCompositionMaterialsService);
//# sourceMappingURL=dynamic-composition-materials.service.js.map