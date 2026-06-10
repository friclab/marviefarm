import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay } from '../../common/display-name';
import { CreateFixedCompositionDto } from './dto/create-fixed-composition.dto';
import { UpdateFixedCompositionDto } from './dto/update-fixed-composition.dto';

export interface FixedCompositionMaterialItem {
  id: number;
  materialId: number;
  quantity: number;
  material: {
    id: number;
    code: string;
    description: string | null;
    price: number | null;
    displayName: string;
    unitmeasurement: { id: number; code: string; description: string | null } | null;
  };
}

export interface FixedCompositionResponse {
  id: number;
  code: string;
  description: string | null;
  displayName: string;
  materials: FixedCompositionMaterialItem[];
}

const includeRelations = {
  materials: {
    include: {
      material: { include: { unitmeasurement: true } },
    },
    orderBy: { material: { code: 'asc' } } as Prisma.FixedCompositionMaterialOrderByWithRelationInput,
  },
} as const;

type FCWithRelations = Prisma.FixedCompositionGetPayload<{ include: typeof includeRelations }>;

function toResponse(row: FCWithRelations): FixedCompositionResponse {
  return {
    id: row.id,
    code: row.code,
    description: row.description,
    displayName: joinDisplay([row.code, row.description]),
    materials: row.materials.map(m => ({
      id: m.id,
      materialId: m.materialId,
      quantity: Number(m.quantity),
      material: {
        id: m.material.id,
        code: m.material.code,
        description: m.material.description,
        price: m.material.price !== null ? Number(m.material.price) : null,
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
  };
}

@Injectable()
export class FixedCompositionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<FixedCompositionResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.fixedComposition.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: { code: 'asc' },
      }),
      this.prisma.fixedComposition.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<FixedCompositionResponse> {
    const row = await this.prisma.fixedComposition.findUnique({
      where: { id },
      include: includeRelations,
    });
    if (!row) throw new NotFoundException(`FixedComposition ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateFixedCompositionDto): Promise<FixedCompositionResponse> {
    const row = await this.prisma.fixedComposition.create({
      data: dto,
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateFixedCompositionDto): Promise<FixedCompositionResponse> {
    await this.findOne(id);
    const row = await this.prisma.fixedComposition.update({
      where: { id },
      data: dto,
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    const articleCount = await this.prisma.article.count({ where: { fixedCompositionId: id } });
    if (articleCount > 0) {
      throw new ConflictException(
        `Cannot delete: ${articleCount} article(s) reference this composition`,
      );
    }
    await this.prisma.$transaction([
      this.prisma.fixedCompositionMaterial.deleteMany({ where: { fixedCompositionId: id } }),
      this.prisma.fixedComposition.delete({ where: { id } }),
    ]);
  }
}
