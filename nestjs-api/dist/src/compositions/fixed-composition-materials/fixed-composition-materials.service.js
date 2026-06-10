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
exports.FixedCompositionMaterialsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const display_name_1 = require("../../common/display-name");
const includeRelations = {
    fixedComposition: true,
    material: { include: { unitmeasurement: true } },
};
function toResponse(row) {
    return {
        id: row.id,
        fixedCompositionId: row.fixedCompositionId,
        materialId: row.materialId,
        quantity: Number(row.quantity),
        fixedComposition: {
            id: row.fixedComposition.id,
            code: row.fixedComposition.code,
            description: row.fixedComposition.description,
            displayName: (0, display_name_1.joinDisplay)([row.fixedComposition.code, row.fixedComposition.description]),
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
let FixedCompositionMaterialsService = class FixedCompositionMaterialsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.fixedCompositionMaterial.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: includeRelations,
                orderBy: [
                    { fixedComposition: { code: 'asc' } },
                    { material: { code: 'asc' } },
                ],
            }),
            this.prisma.fixedCompositionMaterial.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.fixedCompositionMaterial.findUnique({
            where: { id },
            include: includeRelations,
        });
        if (!row)
            throw new common_1.NotFoundException(`FixedCompositionMaterial ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        await this.assertFixedCompositionExists(dto.fixedCompositionId);
        await this.assertMaterialExists(dto.materialId);
        const row = await this.prisma.fixedCompositionMaterial.create({
            data: {
                fixedCompositionId: dto.fixedCompositionId,
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
        const row = await this.prisma.fixedCompositionMaterial.update({
            where: { id },
            data: dto,
            include: includeRelations,
        });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.fixedCompositionMaterial.delete({ where: { id } });
    }
    async assertFixedCompositionExists(id) {
        const exists = await this.prisma.fixedComposition.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`FixedComposition ${id} does not exist`);
    }
    async assertMaterialExists(id) {
        const exists = await this.prisma.material.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Material ${id} does not exist`);
    }
};
exports.FixedCompositionMaterialsService = FixedCompositionMaterialsService;
exports.FixedCompositionMaterialsService = FixedCompositionMaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FixedCompositionMaterialsService);
//# sourceMappingURL=fixed-composition-materials.service.js.map