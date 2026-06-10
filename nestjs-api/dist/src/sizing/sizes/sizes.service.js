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
exports.SizesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
function toResponse(s) {
    return { ...s, displayName: s.code };
}
let SizesService = class SizesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.size.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { code: 'asc' },
            }),
            this.prisma.size.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.size.findUnique({ where: { id } });
        if (!row)
            throw new common_1.NotFoundException(`Size ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        const row = await this.prisma.size.create({ data: { code: dto.code } });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        const row = await this.prisma.size.update({ where: { id }, data: dto });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.size.delete({ where: { id } });
    }
};
exports.SizesService = SizesService;
exports.SizesService = SizesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SizesService);
//# sourceMappingURL=sizes.service.js.map