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
exports.MaterialsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const display_name_1 = require("../../common/display-name");
const includeRelations = {
    supplier: true,
    unitmeasurement: true,
    materialtypes: { include: { materialtype: true } },
};
function toResponse(row) {
    return {
        id: row.id,
        code: row.code,
        description: row.description,
        price: row.price !== null ? Number(row.price) : null,
        supplierId: row.supplierId,
        unitmeasurementId: row.unitmeasurementId,
        supplier: row.supplier
            ? {
                id: row.supplier.id,
                company: row.supplier.company,
                name: row.supplier.name,
                surname: row.supplier.surname,
                displayName: (0, display_name_1.joinDisplay)([
                    row.supplier.company,
                    (0, display_name_1.fullPersonName)(row.supplier.name, row.supplier.surname),
                ]),
            }
            : null,
        unitmeasurement: row.unitmeasurement
            ? {
                id: row.unitmeasurement.id,
                code: row.unitmeasurement.code,
                description: row.unitmeasurement.description,
                displayName: (0, display_name_1.joinDisplay)([row.unitmeasurement.code, row.unitmeasurement.description]),
            }
            : null,
        materialtypes: row.materialtypes.map(({ materialtype: mt }) => ({
            id: mt.id,
            code: mt.code,
            description: mt.description,
            displayName: (0, display_name_1.joinDisplay)([mt.code, mt.description]),
        })),
        displayName: row.code,
    };
}
let MaterialsService = class MaterialsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.material.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: includeRelations,
                orderBy: { code: 'asc' },
            }),
            this.prisma.material.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.material.findUnique({
            where: { id },
            include: includeRelations,
        });
        if (!row)
            throw new common_1.NotFoundException(`Material ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        const { materialtypeIds, ...fields } = dto;
        if (fields.supplierId !== undefined)
            await this.assertSupplierExists(fields.supplierId);
        if (fields.unitmeasurementId !== undefined)
            await this.assertUnitMeasurementExists(fields.unitmeasurementId);
        if (materialtypeIds?.length)
            await this.assertMaterialTypesExist(materialtypeIds);
        const row = await this.prisma.material.create({
            data: {
                ...fields,
                materialtypes: materialtypeIds?.length
                    ? { create: materialtypeIds.map(id => ({ materialtypeId: id })) }
                    : undefined,
            },
            include: includeRelations,
        });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        const { materialtypeIds, ...fields } = dto;
        if (fields.supplierId !== undefined)
            await this.assertSupplierExists(fields.supplierId);
        if (fields.unitmeasurementId !== undefined)
            await this.assertUnitMeasurementExists(fields.unitmeasurementId);
        if (materialtypeIds !== undefined && materialtypeIds.length > 0) {
            await this.assertMaterialTypesExist(materialtypeIds);
        }
        const row = await this.prisma.material.update({
            where: { id },
            data: {
                ...fields,
                ...(materialtypeIds !== undefined && {
                    materialtypes: {
                        deleteMany: {},
                        create: materialtypeIds.map(mtId => ({ materialtypeId: mtId })),
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
            this.prisma.materialMaterialtype.deleteMany({ where: { materialId: id } }),
            this.prisma.material.delete({ where: { id } }),
        ]);
    }
    async assertSupplierExists(id) {
        const exists = await this.prisma.supplier.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Supplier ${id} does not exist`);
    }
    async assertUnitMeasurementExists(id) {
        const exists = await this.prisma.unitmeasurement.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`UnitMeasurement ${id} does not exist`);
    }
    async assertMaterialTypesExist(ids) {
        const found = await this.prisma.materialtype.findMany({
            where: { id: { in: ids } },
            select: { id: true },
        });
        if (found.length !== ids.length) {
            const missing = ids.filter(id => !found.some(f => f.id === id));
            throw new common_1.BadRequestException(`MaterialType IDs not found: ${missing.join(', ')}`);
        }
    }
};
exports.MaterialsService = MaterialsService;
exports.MaterialsService = MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaterialsService);
//# sourceMappingURL=materials.service.js.map