import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay } from '../../common/display-name';
import { CreateDynamicCompositionDto } from './dto/create-dynamic-composition.dto';
import { UpdateDynamicCompositionDto } from './dto/update-dynamic-composition.dto';

export interface DynamicCompositionMaterialItem {
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

export interface DynamicCompositionResponse {
  id: number;
  code: string;
  description: string | null;
  displayName: string;
  materials: DynamicCompositionMaterialItem[];
}

const includeRelations = {
  materials: {
    include: {
      material: { include: { unitmeasurement: true } },
    },
    orderBy: { material: { code: 'asc' } } as Prisma.DynamicCompositionMaterialOrderByWithRelationInput,
  },
} as const;

type DCWithRelations = Prisma.DynamicCompositionGetPayload<{ include: typeof includeRelations }>;

function toResponse(row: DCWithRelations): DynamicCompositionResponse {
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
export class DynamicCompositionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<DynamicCompositionResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.dynamicComposition.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: { code: 'asc' },
      }),
      this.prisma.dynamicComposition.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<DynamicCompositionResponse> {
    const row = await this.prisma.dynamicComposition.findUnique({
      where: { id },
      include: includeRelations,
    });
    if (!row) throw new NotFoundException(`DynamicComposition ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateDynamicCompositionDto): Promise<DynamicCompositionResponse> {
    const row = await this.prisma.dynamicComposition.create({
      data: dto,
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateDynamicCompositionDto): Promise<DynamicCompositionResponse> {
    await this.findOne(id);
    const row = await this.prisma.dynamicComposition.update({
      where: { id },
      data: dto,
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    const fabricCount = await this.prisma.fabric.count({ where: { dynamicCompositionId: id } });
    if (fabricCount > 0) {
      throw new ConflictException(
        `Cannot delete: ${fabricCount} fabric(s) reference this composition`,
      );
    }
    await this.prisma.$transaction([
      this.prisma.dynamicCompositionMaterial.deleteMany({ where: { dynamicCompositionId: id } }),
      this.prisma.dynamicComposition.delete({ where: { id } }),
    ]);
  }
}
