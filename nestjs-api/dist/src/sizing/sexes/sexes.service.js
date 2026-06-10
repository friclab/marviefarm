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
exports.SexesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
function toResponse(sex) {
    return { ...sex, displayName: sex.code };
}
let SexesService = class SexesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.sex.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { code: 'asc' },
            }),
            this.prisma.sex.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const sex = await this.prisma.sex.findUnique({ where: { id } });
        if (!sex)
            throw new common_1.NotFoundException(`Sex ${id} not found`);
        return toResponse(sex);
    }
    async create(dto) {
        const sex = await this.prisma.sex.create({ data: { code: dto.code } });
        return toResponse(sex);
    }
    async update(id, dto) {
        await this.findOne(id);
        const sex = await this.prisma.sex.update({ where: { id }, data: dto });
        return toResponse(sex);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.sex.delete({ where: { id } });
    }
};
exports.SexesService = SexesService;
exports.SexesService = SexesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SexesService);
//# sourceMappingURL=sexes.service.js.map