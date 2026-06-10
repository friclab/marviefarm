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
exports.ModeltypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
function toResponse(m) {
    return { ...m, displayName: `${m.code} - ${m.description ?? ''}`.trimEnd().replace(/ -$/, '') };
}
let ModeltypesService = class ModeltypesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.modeltype.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { code: 'asc' },
            }),
            this.prisma.modeltype.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.modeltype.findUnique({ where: { id } });
        if (!row)
            throw new common_1.NotFoundException(`Modeltype ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        const row = await this.prisma.modeltype.create({ data: dto });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        const row = await this.prisma.modeltype.update({ where: { id }, data: dto });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.modeltype.delete({ where: { id } });
    }
};
exports.ModeltypesService = ModeltypesService;
exports.ModeltypesService = ModeltypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModeltypesService);
//# sourceMappingURL=modeltypes.service.js.map