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
exports.ModeltypesSexSizesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const includeRelations = {
    modeltypeSex: { include: { modeltype: true, sex: true } },
    size: true,
};
function toResponse(row) {
    const mtsDisplay = `${row.modeltypeSex.modeltype.code} - ${row.modeltypeSex.sex.code}`;
    return {
        ...row,
        modeltypeSex: { ...row.modeltypeSex, displayName: mtsDisplay },
        displayName: `${mtsDisplay} / ${row.size.code}`,
    };
}
let ModeltypesSexSizesService = class ModeltypesSexSizesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.modeltypeSexSize.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: includeRelations,
                orderBy: { size: { code: 'asc' } },
            }),
            this.prisma.modeltypeSexSize.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.modeltypeSexSize.findUnique({
            where: { id },
            include: includeRelations,
        });
        if (!row)
            throw new common_1.NotFoundException(`ModeltypeSexSize ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        await this.assertModeltypesSexExists(dto.modeltypeSexId);
        await this.assertSizeExists(dto.sizeId);
        const row = await this.prisma.modeltypeSexSize.create({
            data: { modeltypeSexId: dto.modeltypeSexId, sizeId: dto.sizeId },
            include: includeRelations,
        });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.modeltypeSexId !== undefined)
            await this.assertModeltypesSexExists(dto.modeltypeSexId);
        if (dto.sizeId !== undefined)
            await this.assertSizeExists(dto.sizeId);
        const row = await this.prisma.modeltypeSexSize.update({
            where: { id },
            data: dto,
            include: includeRelations,
        });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.modeltypeSexSize.delete({ where: { id } });
    }
    async assertModeltypesSexExists(id) {
        const exists = await this.prisma.modeltypeSex.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`ModeltypeSex ${id} does not exist`);
    }
    async assertSizeExists(id) {
        const exists = await this.prisma.size.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Size ${id} does not exist`);
    }
};
exports.ModeltypesSexSizesService = ModeltypesSexSizesService;
exports.ModeltypesSexSizesService = ModeltypesSexSizesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModeltypesSexSizesService);
//# sourceMappingURL=modeltypes-sex-sizes.service.js.map