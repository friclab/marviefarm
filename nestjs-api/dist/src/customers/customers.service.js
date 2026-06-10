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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const paginated_result_1 = require("../common/paginated-result");
const display_name_1 = require("../common/display-name");
function toResponse(row) {
    return {
        id: row.id,
        company: row.company,
        name: row.name,
        surname: row.surname,
        email: row.email,
        address: row.address,
        zipCode: row.zipCode,
        city: row.city,
        district: row.district,
        country: row.country,
        vat: row.vat,
        vatApplied: row.vatApplied !== null ? Number(row.vatApplied) : null,
        displayName: (0, display_name_1.joinDisplay)([row.company, (0, display_name_1.fullPersonName)(row.name, row.surname)]),
    };
}
let CustomersService = class CustomersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.customer.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: [{ company: 'asc' }, { surname: 'asc' }],
            }),
            this.prisma.customer.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.customer.findUnique({ where: { id } });
        if (!row)
            throw new common_1.NotFoundException(`Customer ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        const row = await this.prisma.customer.create({ data: dto });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        const row = await this.prisma.customer.update({ where: { id }, data: dto });
        return toResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        const orderCount = await this.prisma.orderHeader.count({ where: { customerId: id } });
        if (orderCount > 0) {
            throw new common_1.ConflictException(`Cannot delete: ${orderCount} order(s) reference this customer`);
        }
        await this.prisma.customer.delete({ where: { id } });
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map