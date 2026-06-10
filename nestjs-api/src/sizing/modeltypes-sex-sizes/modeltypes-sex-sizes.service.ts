import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypesSexSizeDto } from './dto/create-modeltypes-sex-size.dto';
import { UpdateModeltypesSexSizeDto } from './dto/update-modeltypes-sex-size.dto';

export interface ModeltypesSexSizeResponse {
  id: number;
  modeltypeSexId: number;
  sizeId: number;
  modeltypeSex: {
    id: number;
    modeltypeId: number;
    sexId: number;
    modeltype: { id: number; code: string; description: string | null };
    sex: { id: number; code: string };
    displayName: string;
  };
  size: { id: number; code: string };
  displayName: string;
}

const includeRelations = {
  modeltypeSex: { include: { modeltype: true, sex: true } },
  size: true,
} as const;

type RowWithRelations = {
  id: number;
  modeltypeSexId: number;
  sizeId: number;
  modeltypeSex: {
    id: number;
    modeltypeId: number;
    sexId: number;
    modeltype: { id: number; code: string; description: string | null };
    sex: { id: number; code: string };
  };
  size: { id: number; code: string };
};

function toResponse(row: RowWithRelations): ModeltypesSexSizeResponse {
  const mtsDisplay = `${row.modeltypeSex.modeltype.code} - ${row.modeltypeSex.sex.code}`;
  return {
    ...row,
    modeltypeSex: { ...row.modeltypeSex, displayName: mtsDisplay },
    displayName: `${mtsDisplay} / ${row.size.code}`,
  };
}

@Injectable()
export class ModeltypesSexSizesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<ModeltypesSexSizeResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.modeltypeSexSize.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: { size: { code: 'asc' } }, // legacy: var $order = 'Size.code'
      }),
      this.prisma.modeltypeSexSize.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<ModeltypesSexSizeResponse> {
    const row = await this.prisma.modeltypeSexSize.findUnique({
      where: { id },
      include: includeRelations,
    });
    if (!row) throw new NotFoundException(`ModeltypeSexSize ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateModeltypesSexSizeDto): Promise<ModeltypesSexSizeResponse> {
    await this.assertModeltypesSexExists(dto.modeltypeSexId);
    await this.assertSizeExists(dto.sizeId);
    const row = await this.prisma.modeltypeSexSize.create({
      data: { modeltypeSexId: dto.modeltypeSexId, sizeId: dto.sizeId },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateModeltypesSexSizeDto): Promise<ModeltypesSexSizeResponse> {
    await this.findOne(id);
    if (dto.modeltypeSexId !== undefined) await this.assertModeltypesSexExists(dto.modeltypeSexId);
    if (dto.sizeId !== undefined) await this.assertSizeExists(dto.sizeId);
    const row = await this.prisma.modeltypeSexSize.update({
      where: { id },
      data: dto,
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.modeltypeSexSize.delete({ where: { id } });
  }

  private async assertModeltypesSexExists(id: number): Promise<void> {
    const exists = await this.prisma.modeltypeSex.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`ModeltypeSex ${id} does not exist`);
  }

  private async assertSizeExists(id: number): Promise<void> {
    const exists = await this.prisma.size.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Size ${id} does not exist`);
  }
}
