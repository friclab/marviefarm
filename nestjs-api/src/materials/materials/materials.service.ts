import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, MaterialUsage } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay, fullPersonName } from '../../common/display-name';
import { SupplierResponse } from '../suppliers/suppliers.service';
import { UnitMeasurementResponse } from '../unit-measurements/unit-measurements.service';
import { MaterialTypeResponse } from '../material-types/material-types.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

export interface MaterialResponse {
  id: number;
  code: string;
  description: string | null;
  // Decimal → number to ensure JSON numeric type (Prisma Decimal would serialize as string)
  price: number | null;
  // FIXED | DYNAMIC | BOTH — drives composition-grid filtering on the article page
  usage: MaterialUsage;
  supplierId: number | null;
  unitmeasurementId: number | null;
  supplier: SupplierResponse | null;
  unitmeasurement: UnitMeasurementResponse | null;
  materialtypes: MaterialTypeResponse[];
  // Seasonal materials are bound to one collection; null = perennial/legacy.
  collectionId: number | null;
  collection: { id: number; name: string; displayName: string } | null;
  // Legacy $displayField = 'code'
  displayName: string;
}

const includeRelations = {
  supplier: true,
  unitmeasurement: true,
  materialtypes: { include: { materialtype: true } },
  collection: true,
} as const;

// "SS 2027 — name" when labelled, otherwise just the name.
function collectionDisplayName(c: { name: string; type: string | null; year: number | null }): string {
  const season = [c.type, c.year].filter(v => v !== null && v !== undefined).join(' ');
  return season ? `${season} — ${c.name}` : c.name;
}

type MaterialWithRelations = Prisma.MaterialGetPayload<{ include: typeof includeRelations }>;

function toResponse(row: MaterialWithRelations): MaterialResponse {
  return {
    id: row.id,
    code: row.code,
    description: row.description,
    price: row.price !== null ? Number(row.price) : null,
    usage: row.usage,
    supplierId: row.supplierId,
    unitmeasurementId: row.unitmeasurementId,
    supplier: row.supplier
      ? {
          id: row.supplier.id,
          company: row.supplier.company,
          name: row.supplier.name,
          surname: row.supplier.surname,
          displayName: joinDisplay([
            row.supplier.company,
            fullPersonName(row.supplier.name, row.supplier.surname),
          ]),
        }
      : null,
    unitmeasurement: row.unitmeasurement
      ? {
          id: row.unitmeasurement.id,
          code: row.unitmeasurement.code,
          description: row.unitmeasurement.description,
          displayName: joinDisplay([row.unitmeasurement.code, row.unitmeasurement.description]),
        }
      : null,
    materialtypes: row.materialtypes.map(({ materialtype: mt }) => ({
      id: mt.id,
      code: mt.code,
      description: mt.description,
      seasonal: mt.seasonal,
      displayName: joinDisplay([mt.code, mt.description]),
    })),
    collectionId: row.collectionId,
    collection: row.collection
      ? {
          id: row.collection.id,
          name: row.collection.name,
          displayName: collectionDisplayName(row.collection),
        }
      : null,
    displayName: row.code,
  };
}

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page: number,
    limit: number,
    collectionId?: number,
  ): Promise<PaginatedResult<MaterialResponse>> {
    // Season scope keeps perennial/legacy materials (collectionId null) always
    // visible alongside the current season's. Absent collectionId => show all.
    const where: Prisma.MaterialWhereInput =
      collectionId !== undefined
        ? { OR: [{ collectionId: null }, { collectionId }] }
        : {};
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.material.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: { code: 'asc' },
      }),
      this.prisma.material.count({ where }),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<MaterialResponse> {
    const row = await this.prisma.material.findUnique({
      where: { id },
      include: includeRelations,
    });
    if (!row) throw new NotFoundException(`Material ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateMaterialDto): Promise<MaterialResponse> {
    const { materialTypeIds, ...fields } = dto;
    if (fields.supplierId !== undefined) await this.assertSupplierExists(fields.supplierId);
    if (fields.unitmeasurementId !== undefined) await this.assertUnitMeasurementExists(fields.unitmeasurementId);
    if (fields.collectionId) await this.assertCollectionExists(fields.collectionId);
    if (materialTypeIds?.length) await this.assertMaterialTypesExist(materialTypeIds);

    const row = await this.prisma.material.create({
      data: {
        ...fields,
        materialtypes: materialTypeIds?.length
          ? { create: materialTypeIds.map(id => ({ materialtypeId: id })) }
          : undefined,
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateMaterialDto): Promise<MaterialResponse> {
    await this.findOne(id);
    const { materialTypeIds, ...fields } = dto;
    if (fields.supplierId !== undefined) await this.assertSupplierExists(fields.supplierId);
    if (fields.unitmeasurementId !== undefined) await this.assertUnitMeasurementExists(fields.unitmeasurementId);
    if (fields.collectionId) await this.assertCollectionExists(fields.collectionId);
    if (materialTypeIds !== undefined && materialTypeIds.length > 0) {
      await this.assertMaterialTypesExist(materialTypeIds);
    }

    const row = await this.prisma.material.update({
      where: { id },
      data: {
        ...fields,
        // Full-replace strategy for materialtypes (mirrors CakePHP HABTM save behaviour)
        ...(materialTypeIds !== undefined && {
          materialtypes: {
            deleteMany: {},
            create: materialTypeIds.map(mtId => ({ materialtypeId: mtId })),
          },
        }),
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    // Delete join rows first to avoid FK constraint errors
    await this.prisma.$transaction([
      this.prisma.materialMaterialtype.deleteMany({ where: { materialId: id } }),
      this.prisma.material.delete({ where: { id } }),
    ]);
  }

  private async assertSupplierExists(id: number): Promise<void> {
    const exists = await this.prisma.supplier.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Supplier ${id} does not exist`);
  }

  private async assertUnitMeasurementExists(id: number): Promise<void> {
    const exists = await this.prisma.unitmeasurement.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`UnitMeasurement ${id} does not exist`);
  }

  private async assertCollectionExists(id: number): Promise<void> {
    const exists = await this.prisma.collection.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Collection ${id} does not exist`);
  }

  private async assertMaterialTypesExist(ids: number[]): Promise<void> {
    const found = await this.prisma.materialtype.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });
    if (found.length !== ids.length) {
      const missing = ids.filter(id => !found.some(f => f.id === id));
      throw new BadRequestException(`MaterialType IDs not found: ${missing.join(', ')}`);
    }
  }
}
