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
exports.OrderHeadersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const display_name_1 = require("../../common/display-name");
const listInclude = {
    customer: true,
    collection: true,
};
const detailInclude = {
    customer: true,
    collection: true,
    orderDetails: {
        include: {
            article: true,
            fabric: true,
            modeltypeSexSize: {
                include: {
                    size: true,
                    modeltypeSex: { include: { modeltype: true, sex: true } },
                },
            },
        },
    },
};
function customerDisplayName(c) {
    return (0, display_name_1.joinDisplay)([c.company, (0, display_name_1.fullPersonName)(c.name, c.surname)]);
}
function toListItem(row) {
    return {
        id: row.id,
        customerId: row.customerId,
        collectionId: row.collectionId,
        orderNumber: row.orderNumber,
        description: row.description,
        date: row.date ? row.date.toISOString().split('T')[0] : null,
        discount: row.discount !== null ? Number(row.discount) : null,
        payment: row.payment,
        note: row.note,
        displayName: (0, display_name_1.joinDisplay)([row.orderNumber, customerDisplayName(row.customer)]),
        customer: {
            id: row.customer.id,
            company: row.customer.company,
            name: row.customer.name,
            surname: row.customer.surname,
            displayName: customerDisplayName(row.customer),
        },
        collection: row.collection ? { id: row.collection.id, name: row.collection.name } : null,
    };
}
function calculateTotals(details, discount, vatApplied) {
    const partialTotal = details.reduce((sum, d) => sum + (d.quantity ?? 0) * Number(d.fabric?.price ?? 0), 0);
    const discountPct = Number(discount ?? 0);
    const vatPct = Number(vatApplied ?? 0);
    const discountAmount = partialTotal * discountPct / 100;
    const subtotal = partialTotal - discountAmount;
    const vat = vatPct * subtotal / 100;
    const grandTotal = subtotal + vat;
    return { partialTotal, discountAmount, subtotal, vat, grandTotal };
}
function toDetailResponse(row) {
    const base = toListItem(row);
    const totals = calculateTotals(row.orderDetails, row.discount, row.customer.vatApplied);
    const orderDetails = row.orderDetails.map(d => ({
        id: d.id,
        orderHeaderId: d.orderHeaderId,
        articleId: d.articleId,
        fabricId: d.fabricId,
        modeltypeSexSizeId: d.modeltypeSexSizeId,
        quantity: d.quantity,
        note: d.note,
        article: {
            id: d.article.id,
            name: d.article.name,
            description: d.article.description,
            displayName: (0, display_name_1.joinDisplay)([d.article.name, d.article.description]),
        },
        fabric: d.fabric
            ? {
                id: d.fabric.id,
                code: d.fabric.code,
                description: d.fabric.description,
                price: d.fabric.price !== null ? Number(d.fabric.price) : null,
                displayName: (0, display_name_1.joinDisplay)([d.fabric.code, d.fabric.description]),
            }
            : null,
        modeltypeSexSize: d.modeltypeSexSize
            ? {
                id: d.modeltypeSexSize.id,
                size: { id: d.modeltypeSexSize.size.id, code: d.modeltypeSexSize.size.code },
                modeltypeSex: {
                    id: d.modeltypeSexSize.modeltypeSex.id,
                    modeltype: {
                        id: d.modeltypeSexSize.modeltypeSex.modeltype.id,
                        code: d.modeltypeSexSize.modeltypeSex.modeltype.code,
                    },
                    sex: {
                        id: d.modeltypeSexSize.modeltypeSex.sex.id,
                        code: d.modeltypeSexSize.modeltypeSex.sex.code,
                    },
                },
            }
            : null,
    }));
    return { ...base, orderDetails, totals };
}
let OrderHeadersService = class OrderHeadersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.orderHeader.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: listInclude,
                orderBy: { id: 'desc' },
            }),
            this.prisma.orderHeader.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toListItem), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.orderHeader.findUnique({
            where: { id },
            include: detailInclude,
        });
        if (!row)
            throw new common_1.NotFoundException(`OrderHeader ${id} not found`);
        return toDetailResponse(row);
    }
    async getNextId() {
        const last = await this.prisma.orderHeader.findFirst({
            orderBy: { id: 'desc' },
            select: { id: true },
        });
        return { nextId: (last?.id ?? 0) + 1 };
    }
    async create(dto) {
        await this.assertCustomerExists(dto.customerId);
        if (dto.collectionId !== undefined)
            await this.assertCollectionExists(dto.collectionId);
        const row = await this.prisma.orderHeader.create({
            data: {
                ...dto,
                date: dto.date ? new Date(dto.date) : undefined,
            },
            include: detailInclude,
        });
        return toDetailResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        if (dto.customerId !== undefined)
            await this.assertCustomerExists(dto.customerId);
        if (dto.collectionId !== undefined)
            await this.assertCollectionExists(dto.collectionId);
        const row = await this.prisma.orderHeader.update({
            where: { id },
            data: {
                ...dto,
                date: dto.date ? new Date(dto.date) : dto.date === null ? null : undefined,
            },
            include: detailInclude,
        });
        return toDetailResponse(row);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.$transaction([
            this.prisma.orderDetail.deleteMany({ where: { orderHeaderId: id } }),
            this.prisma.orderHeader.delete({ where: { id } }),
        ]);
    }
    async assertCustomerExists(id) {
        const exists = await this.prisma.customer.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Customer ${id} does not exist`);
    }
    async assertCollectionExists(id) {
        const exists = await this.prisma.collection.findUnique({ where: { id } });
        if (!exists)
            throw new common_1.BadRequestException(`Collection ${id} does not exist`);
    }
};
exports.OrderHeadersService = OrderHeadersService;
exports.OrderHeadersService = OrderHeadersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderHeadersService);
//# sourceMappingURL=order-headers.service.js.map