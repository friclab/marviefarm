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
exports.ModeltypesSexesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const includeRelations = {
    modeltype: true,
    sex: true,
};
function toResponse(row) {
    return {
        ...row,
        displayName: `${row.modeltype.code} - ${row.sex.code}`,
    };
}
let ModeltypesSexesService = class ModeltypesSexesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.modeltypeSex.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: includeRelations,
                orderBy: [{ modeltype: { code: 'asc' } }, { sex: { code: 'asc' } }],
            }),
            this.prisma.modeltypeSex.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.modeltypeSex.findUnique({
            where: { id },
            include: includeRelations,
        });
        if (!row)
            throw new common_1.NotFoundException(`ModeltypeSex ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        await this.assertModeltypeExists(dto.modeltypeId);
        await this.assertSexExists(dto.sexId);
        const row = await this.prisma.modeltypeSex.create({
            data: { modeltypeId: dto.modeltypeId, sexId: dto.sexId },
            include: includeRelations,
        });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.modeltypeId !== undefined)
            await this.assertModeltypeExists(dto.modeltypeId);
        if (dto.sexId !== undefined)
            await this.assertSexExists(dto.sexId);
        const row = await this.prisma.modeltypeSex.update({
            where: { id },
            data: dto,
            include: includeRelations,
        });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.modeltypeSex.delete({ where: { id } });
    }
    async assertModeltypeExists(id) {
        const exists = await this.prisma.modeltype.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Modeltype ${id} does not exist`);
    }
    async assertSexExists(id) {
        const exists = await this.prisma.sex.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Sex ${id} does not exist`);
    }
};
exports.ModeltypesSexesService = ModeltypesSexesService;
exports.ModeltypesSexesService = ModeltypesSexesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModeltypesSexesService);
//# sourceMappingURL=modeltypes-sexes.service.js.map