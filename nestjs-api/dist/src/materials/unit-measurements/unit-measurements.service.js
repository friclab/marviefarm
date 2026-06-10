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
exports.UnitMeasurementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const display_name_1 = require("../../common/display-name");
function toResponse(um) {
    return { ...um, displayName: (0, display_name_1.joinDisplay)([um.code, um.description]) };
}
let UnitMeasurementsService = class UnitMeasurementsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.unitmeasurement.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { code: 'asc' },
            }),
            this.prisma.unitmeasurement.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.unitmeasurement.findUnique({ where: { id } });
        if (!row)
            throw new common_1.NotFoundException(`UnitMeasurement ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        const row = await this.prisma.unitmeasurement.create({ data: dto });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        const row = await this.prisma.unitmeasurement.update({ where: { id }, data: dto });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.unitmeasurement.delete({ where: { id } });
    }
};
exports.UnitMeasurementsService = UnitMeasurementsService;
exports.UnitMeasurementsService = UnitMeasurementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnitMeasurementsService);
//# sourceMappingURL=unit-measurements.service.js.map