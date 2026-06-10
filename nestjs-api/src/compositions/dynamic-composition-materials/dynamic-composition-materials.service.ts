import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay } from '../../common/display-name';
import { CreateDynamicCompositionMaterialDto } from './dto/create-dynamic-composition-material.dto';
import { UpdateDynamicCompositionMaterialDto } from './dto/update-dynamic-composition-material.dto';

export interface DynamicCompositionMaterialResponse {
  id: number;
  dynamicCompositionId: number;
  materialId: number;
  quantity: number;
  dynamicComposition: { id: number; code: string; description: string | null; displayName: string };
  material: {
    id: number;
    code: string;
    description: string | null;
    price: number | null;
    displayName: string;
    unitmeasurement: { id: number; code: string; description: string | null } | null;
  };
}

const includeRelations = {
  dynamicComposition: true,
  material: { include: { unitmeasurement: true } },
} as const;

type DCMWithRelations = Prisma.DynamicCompositionMaterialGetPayload<{
  include: typeof includeRelations;
}>;

function toResponse(row: DCMWithRelations): DynamicCompositionMaterialResponse {
  return {
    id: row.id,
    dynamicCompositionId: row.dynamicCompositionId,
    materialId: row.materialId,
    quantity: Number(row.quantity),
    dynamicComposition: {
      id: row.dynamicComposition.id,
      code: row.dynamicComposition.code,
      description: row.dynamicComposition.description,
      displayName: joinDisplay([row.dynamicComposition.code, row.dynamicComposition.description]),
    },
    material: {
      id: row.material.id,
      code: row.material.code,
      description: row.material.description,
      price: row.material.price !== null ? Number(row.material.price) : null,
      displayName: row.material.code,
      unitmeasurement: row.material.unitmeasurement
        ? {
            id: row.material.unitmeasurement.id,
            code: row.material.unitmeasurement.code,
            description: row.material.unitmeasurement.description,
          }
        : null,
    },
  };
}

@Injectable()
export class DynamicCompositionMaterialsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<DynamicCompositionMaterialResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.dynamicCompositionMaterial.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: [
          { dynamicComposition: { code: 'asc' } },
          { material: { code: 'asc' } },
        ],
      }),
      this.prisma.dynamicCompositionMaterial.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<DynamicCompositionMaterialResponse> {
    const row = await this.prisma.dynamicCompositionMaterial.findUnique({
      where: { id },
      include: includeRelations,
    });
    if (!row) throw new NotFoundException(`DynamicCompositionMaterial ${id} not found`);
    return toResponse(row);
  }

  async create(
    dto: CreateDynamicCompositionMaterialDto,
  ): Promise<DynamicCompositionMaterialResponse> {
    await this.assertDynamicCompositionExists(dto.dynamicCompositionId);
    await this.assertMaterialExists(dto.materialId);
    const row = await this.prisma.dynamicCompositionMaterial.create({
      data: {
        dynamicCompositionId: dto.dynamicCompositionId,
        materialId: dto.materialId,
        quantity: dto.quantity,
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(
    id: number,
    dto: UpdateDynamicCompositionMaterialDto,
  ): Promise<DynamicCompositionMaterialResponse> {
    await this.findOne(id);
    if (dto.materialId !== undefined) await this.assertMaterialExists(dto.materialId);
    const row = await this.prisma.dynamicCompositionMaterial.update({
      where: { id },
      data: dto,
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.dynamicCompositionMaterial.delete({ where: { id } });
  }

  private async assertDynamicCompositionExists(id: number): Promise<void> {
    const exists = await this.prisma.dynamicComposition.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`DynamicComposition ${id} does not exist`);
  }

  private async assertMaterialExists(id: number): Promise<void> {
    const exists = await this.prisma.material.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Material ${id} does not exist`);
  }
}
