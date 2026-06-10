import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay } from '../../common/display-name';
import { CreateFixedCompositionMaterialDto } from './dto/create-fixed-composition-material.dto';
import { UpdateFixedCompositionMaterialDto } from './dto/update-fixed-composition-material.dto';

export interface FixedCompositionMaterialResponse {
  id: number;
  fixedCompositionId: number;
  materialId: number;
  quantity: number;
  fixedComposition: { id: number; code: string; description: string | null; displayName: string };
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
  fixedComposition: true,
  material: { include: { unitmeasurement: true } },
} as const;

type FCMWithRelations = Prisma.FixedCompositionMaterialGetPayload<{
  include: typeof includeRelations;
}>;

function toResponse(row: FCMWithRelations): FixedCompositionMaterialResponse {
  return {
    id: row.id,
    fixedCompositionId: row.fixedCompositionId,
    materialId: row.materialId,
    quantity: Number(row.quantity),
    fixedComposition: {
      id: row.fixedComposition.id,
      code: row.fixedComposition.code,
      description: row.fixedComposition.description,
      displayName: joinDisplay([row.fixedComposition.code, row.fixedComposition.description]),
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
export class FixedCompositionMaterialsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<FixedCompositionMaterialResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.fixedCompositionMaterial.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: [
          { fixedComposition: { code: 'asc' } },
          { material: { code: 'asc' } },
        ],
      }),
      this.prisma.fixedCompositionMaterial.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<FixedCompositionMaterialResponse> {
    const row = await this.prisma.fixedCompositionMaterial.findUnique({
      where: { id },
      include: includeRelations,
    });
    if (!row) throw new NotFoundException(`FixedCompositionMaterial ${id} not found`);
    return toResponse(row);
  }

  async create(
    dto: CreateFixedCompositionMaterialDto,
  ): Promise<FixedCompositionMaterialResponse> {
    await this.assertFixedCompositionExists(dto.fixedCompositionId);
    await this.assertMaterialExists(dto.materialId);
    const row = await this.prisma.fixedCompositionMaterial.create({
      data: {
        fixedCompositionId: dto.fixedCompositionId,
        materialId: dto.materialId,
        quantity: dto.quantity,
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(
    id: number,
    dto: UpdateFixedCompositionMaterialDto,
  ): Promise<FixedCompositionMaterialResponse> {
    await this.findOne(id);
    if (dto.materialId !== undefined) await this.assertMaterialExists(dto.materialId);
    const row = await this.prisma.fixedCompositionMaterial.update({
      where: { id },
      data: dto,
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.fixedCompositionMaterial.delete({ where: { id } });
  }

  private async assertFixedCompositionExists(id: number): Promise<void> {
    const exists = await this.prisma.fixedComposition.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`FixedComposition ${id} does not exist`);
  }

  private async assertMaterialExists(id: number): Promise<void> {
    const exists = await this.prisma.material.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Material ${id} does not exist`);
  }
}
