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
exports.FixedCompositionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const display_name_1 = require("../../common/display-name");
const includeRelations = {
    materials: {
        include: {
            material: { include: { unitmeasurement: true } },
        },
        orderBy: { material: { code: 'asc' } },
    },
};
function toResponse(row) {
    return {
        id: row.id,
        code: row.code,
        description: row.description,
        displayName: (0, display_name_1.joinDisplay)([row.code, row.description]),
        materials: row.materials.map(m => ({
            id: m.id,
            materialId: m.materialId,
            quantity: Number(m.quantity),
            material: {
                id: m.material.id,
                code: m.material.code,
                description: m.material.description,
                price: m.material.price !== null ? Number(m.material.price) : null,
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
    };
}
let FixedCompositionsService = class FixedCompositionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.fixedComposition.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: includeRelations,
                orderBy: { code: 'asc' },
            }),
            this.prisma.fixedComposition.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.fixedComposition.findUnique({
            where: { id },
            include: includeRelations,
        });
        if (!row)
            throw new common_1.NotFoundException(`FixedComposition ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        const row = await this.prisma.fixedComposition.create({
            data: dto,
            include: includeRelations,
        });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        const row = await this.prisma.fixedComposition.update({
            where: { id },
            data: dto,
            include: includeRelations,
        });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        const articleCount = await this.prisma.article.count({ where: { fixedCompositionId: id } });
        if (articleCount > 0) {
            throw new common_1.ConflictException(`Cannot delete: ${articleCount} article(s) reference this composition`);
        }
        await this.prisma.$transaction([
            this.prisma.fixedCompositionMaterial.deleteMany({ where: { fixedCompositionId: id } }),
            this.prisma.fixedComposition.delete({ where: { id } }),
        ]);
    }
};
exports.FixedCompositionsService = FixedCompositionsService;
exports.FixedCompositionsService = FixedCompositionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FixedCompositionsService);
//# sourceMappingURL=fixed-compositions.service.js.map