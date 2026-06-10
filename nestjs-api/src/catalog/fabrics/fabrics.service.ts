import {
  BadRequestException, ConflictException, Injectable, NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay } from '../../common/display-name';
import { CreateFabricDto } from './dto/create-fabric.dto';
import { UpdateFabricDto } from './dto/update-fabric.dto';

interface DynamicCompositionMaterialItem {
  id: number;
  materialId: number;
  quantity: number;
  material: {
    id: number;
    code: string;
    description: string | null;
    displayName: string;
    unitmeasurement: { id: number; code: string; description: string | null } | null;
  };
}

interface DynamicCompositionDetail {
  id: number;
  code: string;
  description: string | null;
  displayName: string;
  materials: DynamicCompositionMaterialItem[];
}

export interface FabricResponse {
  id: number;
  code: string;
  description: string | null;
  price: number | null;
  articleId: number;
  dynamicCompositionId: number | null;
  displayName: string;
  article: { id: number; name: string; description: string | null; displayName: string };
  dynamicComposition: DynamicCompositionDetail | null;
}

const includeRelations = {
  article: true,
  dynamicComposition: {
    include: {
      materials: {
        include: { material: { include: { unitmeasurement: true } } },
        orderBy: { material: { code: 'asc' } } as Prisma.DynamicCompositionMaterialOrderByWithRelationInput,
      },
    },
  },
} as const;

type FabricWithRelations = Prisma.FabricGetPayload<{ include: typeof includeRelations }>;

function toResponse(row: FabricWithRelations): FabricResponse {
  return {
    id: row.id,
    code: row.code,
    description: row.description,
    price: row.price !== null ? Number(row.price) : null,
    articleId: row.articleId,
    dynamicCompositionId: row.dynamicCompositionId,
    displayName: joinDisplay([row.code, row.description]),
    article: {
      id: row.article.id,
      name: row.article.name,
      description: row.article.description,
      displayName: joinDisplay([row.article.name, row.article.description]),
    },
    dynamicComposition: row.dynamicComposition
      ? {
          id: row.dynamicComposition.id,
          code: row.dynamicComposition.code,
          description: row.dynamicComposition.description,
          displayName: joinDisplay([row.dynamicComposition.code, row.dynamicComposition.description]),
          materials: row.dynamicComposition.materials.map(m => ({
            id: m.id,
            materialId: m.materialId,
            quantity: Number(m.quantity),
            material: {
              id: m.material.id,
              code: m.material.code,
              description: m.material.description,
              displayName: m.material.code,
              unitmeasurement: m.material.unitmeasurement
                ? {
                    id: m.material.unitmeasurement.id,
                    code: m.material.unitmeasurement.code,
                    description: m.material.unitmeasurement.description,
                  }
                : null,
            },
          })),
        }
      : null,
  };
}

@Injectable()
export class FabricsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number, articleId?: number): Promise<PaginatedResult<FabricResponse>> {
    const where = articleId !== undefined ? { articleId } : undefined;
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.fabric.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        include: includeRelations,
        orderBy: [{ article: { name: 'asc' } }, { code: 'asc' }],
      }),
      this.prisma.fabric.count({ where }),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<FabricResponse> {
    const row = await this.prisma.fabric.findUnique({ where: { id }, include: includeRelations });
    if (!row) throw new NotFoundException(`Fabric ${id} not found`);
    return toResponse(row);
  }

  async findByArticle(articleId: number): Promise<FabricResponse[]> {
    const rows = await this.prisma.fabric.findMany({
      where: { articleId },
      include: includeRelations,
      orderBy: { code: 'asc' },
    });
    return rows.map(toResponse);
  }

  async create(dto: CreateFabricDto): Promise<FabricResponse> {
    await this.assertArticleExists(dto.articleId);
    if (dto.dynamicCompositionId !== undefined) {
      await this.assertDynamicCompositionExists(dto.dynamicCompositionId);
    }

    const row = await this.prisma.fabric.create({ data: dto, include: includeRelations });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateFabricDto): Promise<FabricResponse> {
    await this.findOne(id);
    if (dto.articleId !== undefined) await this.assertArticleExists(dto.articleId);
    if (dto.dynamicCompositionId !== undefined) {
      await this.assertDynamicCompositionExists(dto.dynamicCompositionId);
    }

    const row = await this.prisma.fabric.update({
      where: { id },
      data: dto,
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    const detailCount = await this.prisma.orderDetail.count({ where: { fabricId: id } });
    if (detailCount > 0) {
      throw new ConflictException(
        `Cannot delete: ${detailCount} order detail(s) reference this fabric`,
      );
    }
    await this.prisma.fabric.delete({ where: { id } });
  }

  private async assertArticleExists(id: number): Promise<void> {
    const exists = await this.prisma.article.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Article ${id} does not exist`);
  }

  private async assertDynamicCompositionExists(id: number): Promise<void> {
    const exists = await this.prisma.dynamicComposition.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`DynamicComposition ${id} does not exist`);
  }
}
