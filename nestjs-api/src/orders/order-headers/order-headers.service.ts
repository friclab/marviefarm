import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay, fullPersonName } from '../../common/display-name';
import { CreateOrderHeaderDto } from './dto/create-order-header.dto';
import { UpdateOrderHeaderDto } from './dto/update-order-header.dto';
import { computeOrderTotals, OrderTotals } from '../order-totals';

export { OrderTotals };

export interface OrderHeaderListItem {
  id: number;
  customerId: number;
  collectionId: number | null;
  orderNumber: string | null;
  description: string | null;
  date: string | null;
  discount: number | null;
  payment: string | null;
  note: string | null;
  displayName: string;
  customer: { id: number; company: string | null; name: string | null; surname: string | null; displayName: string };
  collection: { id: number; name: string } | null;
  totals: OrderTotals;
}

export interface OrderDetailSnippet {
  id: number;
  orderHeaderId: number;
  articleId: number;
  fabricId: number | null;
  modeltypeSexSizeId: number | null;
  quantity: number | null;
  unitPrice: number | null;
  note: string | null;
  article: { id: number; name: string; description: string | null; displayName: string };
  fabric: { id: number; code: string; description: string | null; price: number | null; displayName: string } | null;
  modeltypeSexSize: {
    id: number;
    size: { id: number; code: string };
    modeltypeSex: {
      id: number;
      modeltype: { id: number; code: string };
      sex: { id: number; code: string };
    };
  } | null;
}

export interface OrderHeaderDetailResponse extends OrderHeaderListItem {
  orderDetails: OrderDetailSnippet[];
  totals: OrderTotals;
}

const listInclude = {
  customer: true,
  collection: true,
  // Totals read the frozen unitPrice column on orderDetails — no fabric join needed.
  orderDetails: true,
} as const;

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
} as const;

type OrderHeaderList = Prisma.OrderHeaderGetPayload<{ include: typeof listInclude }>;
type OrderHeaderDetail = Prisma.OrderHeaderGetPayload<{ include: typeof detailInclude }>;

function customerDisplayName(c: { company: string | null; name: string | null; surname: string | null }): string {
  return joinDisplay([c.company, fullPersonName(c.name, c.surname)]);
}

function toListItem(row: OrderHeaderList): OrderHeaderListItem {
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
    displayName: joinDisplay([row.orderNumber, customerDisplayName(row.customer)]),
    customer: {
      id: row.customer.id,
      company: row.customer.company,
      name: row.customer.name,
      surname: row.customer.surname,
      displayName: customerDisplayName(row.customer),
    },
    collection: row.collection ? { id: row.collection.id, name: row.collection.name } : null,
    totals: computeOrderTotals(row.orderDetails, row.discount, row.vatAppliedSnapshot),
  };
}

function toDetailResponse(row: OrderHeaderDetail): OrderHeaderDetailResponse {
  const base = toListItem(row as unknown as OrderHeaderList);
  const totals = computeOrderTotals(row.orderDetails, row.discount, row.vatAppliedSnapshot);

  const orderDetails: OrderDetailSnippet[] = row.orderDetails.map(d => ({
    id: d.id,
    orderHeaderId: d.orderHeaderId,
    articleId: d.articleId,
    fabricId: d.fabricId,
    modeltypeSexSizeId: d.modeltypeSexSizeId,
    quantity: d.quantity,
    unitPrice: d.unitPrice !== null ? Number(d.unitPrice) : null,
    note: d.note,
    article: {
      id: d.article.id,
      name: d.article.name,
      description: d.article.description,
      displayName: joinDisplay([d.article.name, d.article.description]),
    },
    fabric: d.fabric
      ? {
          id: d.fabric.id,
          code: d.fabric.code,
          description: d.fabric.description,
          price: d.fabric.price !== null ? Number(d.fabric.price) : null,
          displayName: joinDisplay([d.fabric.code, d.fabric.description]),
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

@Injectable()
export class OrderHeadersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<OrderHeaderListItem>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.orderHeader.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: listInclude,
        orderBy: { id: 'desc' },
      }),
      this.prisma.orderHeader.count(),
    ]);
    return paginate(rows.map(toListItem), total, page, limit);
  }

  async findOne(id: number): Promise<OrderHeaderDetailResponse> {
    const row = await this.prisma.orderHeader.findUnique({
      where: { id },
      include: detailInclude,
    });
    if (!row) throw new NotFoundException(`OrderHeader ${id} not found`);
    return toDetailResponse(row);
  }

  async getNextId(): Promise<{ nextId: number }> {
    const last = await this.prisma.orderHeader.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true },
    });
    return { nextId: (last?.id ?? 0) + 1 };
  }

  async create(dto: CreateOrderHeaderDto): Promise<OrderHeaderDetailResponse> {
    const customer = await this.prisma.customer.findUnique({ where: { id: dto.customerId } });
    if (!customer) throw new BadRequestException(`Customer ${dto.customerId} does not exist`);
    if (dto.collectionId !== undefined) await this.assertCollectionExists(dto.collectionId);

    const row = await this.prisma.orderHeader.create({
      data: {
        ...dto,
        date: dto.date ? new Date(dto.date) : undefined,
        // Freeze the customer's VAT rate so later changes don't alter this order.
        vatAppliedSnapshot: customer.vatApplied,
      },
      include: detailInclude,
    });
    return toDetailResponse(row);
  }

  async update(id: number, dto: UpdateOrderHeaderDto): Promise<OrderHeaderDetailResponse> {
    await this.findOne(id);
    if (dto.customerId !== undefined) await this.assertCustomerExists(dto.customerId);
    if (dto.collectionId !== undefined) await this.assertCollectionExists(dto.collectionId);

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

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.$transaction([
      this.prisma.orderDetail.deleteMany({ where: { orderHeaderId: id } }),
      this.prisma.orderHeader.delete({ where: { id } }),
    ]);
  }

  private async assertCustomerExists(id: number): Promise<void> {
    const exists = await this.prisma.customer.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Customer ${id} does not exist`);
  }

  private async assertCollectionExists(id: number): Promise<void> {
    const exists = await this.prisma.collection.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Collection ${id} does not exist`);
  }
}
