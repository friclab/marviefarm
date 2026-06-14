import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay } from '../../common/display-name';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { BatchCreateOrderDetailDto } from './dto/batch-create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

export { UpdateOrderDetailDto };

export interface OrderDetailResponse {
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

export interface FabricOption {
  id: number;
  code: string;
  description: string | null;
  price: number | null;
  displayName: string;
}

export interface SizeOption {
  modeltypeSexSizeId: number;
  sizeId: number;
  sizeCode: string;
}

export interface ArticleInfo {
  articleId: number;
  name: string;
  fabrics: FabricOption[];
}

const includeRelations = {
  article: true,
  fabric: true,
  modeltypeSexSize: {
    include: {
      size: true,
      modeltypeSex: { include: { modeltype: true, sex: true } },
    },
  },
} as const;

type OrderDetailWithRelations = Prisma.OrderDetailGetPayload<{ include: typeof includeRelations }>;

function toResponse(d: OrderDetailWithRelations): OrderDetailResponse {
  return {
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
  };
}

@Injectable()
export class OrderDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<OrderDetailResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.orderDetail.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: { id: 'desc' },
      }),
      this.prisma.orderDetail.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<OrderDetailResponse> {
    const row = await this.prisma.orderDetail.findUnique({ where: { id }, include: includeRelations });
    if (!row) throw new NotFoundException(`OrderDetail ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateOrderDetailDto): Promise<OrderDetailResponse> {
    await this.assertOrderHeaderExists(dto.orderHeaderId);
    await this.assertArticleExists(dto.articleId);
    await this.assertSameSeason(dto.orderHeaderId, dto.articleId);
    // Freeze the fabric's current price onto the line at creation time.
    const unitPrice = dto.fabricId !== undefined ? await this.fabricPriceOrThrow(dto.fabricId) : null;
    if (dto.modeltypeSexSizeId !== undefined) await this.assertSizeExists(dto.modeltypeSexSizeId);

    const row = await this.prisma.orderDetail.create({
      data: { ...dto, unitPrice },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateOrderDetailDto): Promise<OrderDetailResponse> {
    await this.findOne(id);
    if (dto.articleId !== undefined) await this.assertArticleExists(dto.articleId);
    if (dto.modeltypeSexSizeId !== undefined) await this.assertSizeExists(dto.modeltypeSexSizeId);
    // Re-freeze the unit price only when the fabric itself changes.
    const repriced =
      dto.fabricId !== undefined ? { unitPrice: await this.fabricPriceOrThrow(dto.fabricId) } : {};

    const row = await this.prisma.orderDetail.update({
      where: { id },
      data: { ...dto, ...repriced },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.orderDetail.delete({ where: { id } });
  }

  // Replaces CakePHP add2() — batch insert within a single transaction
  async batchCreate(dto: BatchCreateOrderDetailDto): Promise<{ created: number }> {
    await this.assertOrderHeaderExists(dto.orderHeaderId);
    await this.assertArticleExists(dto.articleId);
    await this.assertSameSeason(dto.orderHeaderId, dto.articleId);
    // Freeze the fabric's current price; all batch lines share the same fabric.
    const unitPrice = await this.fabricPriceOrThrow(dto.fabricId);

    const validItems = dto.items.filter(item => item.quantity > 0);
    if (validItems.length === 0) return { created: 0 };

    await this.prisma.$transaction(async tx => {
      for (const item of validItems) {
        await tx.orderDetail.create({
          data: {
            orderHeaderId: dto.orderHeaderId,
            articleId: dto.articleId,
            fabricId: dto.fabricId,
            modeltypeSexSizeId: item.modeltypeSexSizeId,
            quantity: item.quantity,
            unitPrice,
            note: dto.note,
          },
        });
      }
    });

    return { created: validItems.length };
  }

  // Replaces CakePHP getFabricOptions() AJAX action
  async getFabricOptions(articleId: number): Promise<FabricOption[]> {
    const fabrics = await this.prisma.fabric.findMany({
      where: { articleId },
      orderBy: { code: 'asc' },
    });
    return fabrics.map(f => ({
      id: f.id,
      code: f.code,
      description: f.description,
      price: f.price !== null ? Number(f.price) : null,
      displayName: joinDisplay([f.code, f.description]),
    }));
  }

  // Replaces CakePHP getModeltypessexessizeOptions() AJAX action
  async getSizeOptions(articleId: number): Promise<SizeOption[]> {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
      select: { modeltypesSexId: true },
    });
    if (!article) throw new NotFoundException(`Article ${articleId} not found`);

    const sizes = await this.prisma.modeltypeSexSize.findMany({
      where: { modeltypeSexId: article.modeltypesSexId },
      include: { size: true },
      orderBy: { size: { code: 'asc' } },
    });
    return sizes.map(s => ({
      modeltypeSexSizeId: s.id,
      sizeId: s.sizeId,
      sizeCode: s.size.code,
    }));
  }

  // Replaces CakePHP getArticleInfo() AJAX action (original had SQL injection)
  async getArticleInfo(articleId: number): Promise<ArticleInfo> {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true, name: true },
    });
    if (!article) throw new NotFoundException(`Article ${articleId} not found`);

    const fabrics = await this.prisma.fabric.findMany({
      where: { articleId },
      orderBy: { code: 'asc' },
    });

    return {
      articleId: article.id,
      name: article.name,
      fabrics: fabrics.map(f => ({
        id: f.id,
        code: f.code,
        description: f.description,
        price: f.price !== null ? Number(f.price) : null,
        displayName: joinDisplay([f.code, f.description]),
      })),
    };
  }

  private async assertOrderHeaderExists(id: number): Promise<void> {
    const exists = await this.prisma.orderHeader.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`OrderHeader ${id} does not exist`);
  }

  private async assertArticleExists(id: number): Promise<void> {
    const exists = await this.prisma.article.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Article ${id} does not exist`);
  }

  // Req. 2 (soft): an order line's article must belong to the order's season. Only
  // enforced when BOTH the order and the article carry a collection — legacy rows
  // with either side null are left untouched.
  private async assertSameSeason(orderHeaderId: number, articleId: number): Promise<void> {
    const [order, article] = await Promise.all([
      this.prisma.orderHeader.findUnique({
        where: { id: orderHeaderId },
        select: { collectionId: true },
      }),
      this.prisma.article.findUnique({
        where: { id: articleId },
        select: { project: { select: { collectionId: true } } },
      }),
    ]);
    const orderCollectionId = order?.collectionId ?? null;
    const articleCollectionId = article?.project?.collectionId ?? null;
    if (
      orderCollectionId !== null &&
      articleCollectionId !== null &&
      orderCollectionId !== articleCollectionId
    ) {
      throw new BadRequestException(
        `Article belongs to a different season (collection ${articleCollectionId}) than the order (collection ${orderCollectionId})`,
      );
    }
  }

  // Validates the fabric exists and returns its current price to snapshot onto the line.
  private async fabricPriceOrThrow(id: number): Promise<Prisma.Decimal | null> {
    const fabric = await this.prisma.fabric.findUnique({ where: { id } });
    if (!fabric) throw new BadRequestException(`Fabric ${id} does not exist`);
    return fabric.price;
  }

  private async assertSizeExists(id: number): Promise<void> {
    const exists = await this.prisma.modeltypeSexSize.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`ModeltypeSexSize ${id} does not exist`);
  }
}
