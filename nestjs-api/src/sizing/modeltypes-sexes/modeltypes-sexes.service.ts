import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypesSexDto } from './dto/create-modeltypes-sex.dto';
import { UpdateModeltypesSexDto } from './dto/update-modeltypes-sex.dto';

export interface ModeltypesSexResponse {
  id: number;
  modeltypeId: number;
  sexId: number;
  modeltype: { id: number; code: string; description: string | null };
  sex: { id: number; code: string };
  displayName: string;
}

const includeRelations = {
  modeltype: true,
  sex: true,
} as const;

type RowWithRelations = {
  id: number;
  modeltypeId: number;
  sexId: number;
  modeltype: { id: number; code: string; description: string | null };
  sex: { id: number; code: string };
};

function toResponse(row: RowWithRelations): ModeltypesSexResponse {
  return {
    ...row,
    displayName: `${row.modeltype.code} - ${row.sex.code}`,
  };
}

@Injectable()
export class ModeltypesSexesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<ModeltypesSexResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.modeltypeSex.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: [{ modeltype: { code: 'asc' } }, { sex: { code: 'asc' } }],
      }),
      this.prisma.modeltypeSex.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<ModeltypesSexResponse> {
    const row = await this.prisma.modeltypeSex.findUnique({
      where: { id },
      include: includeRelations,
    });
    if (!row) throw new NotFoundException(`ModeltypeSex ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateModeltypesSexDto): Promise<ModeltypesSexResponse> {
    await this.assertModeltypeExists(dto.modeltypeId);
    await this.assertSexExists(dto.sexId);
    const row = await this.prisma.modeltypeSex.create({
      data: { modeltypeId: dto.modeltypeId, sexId: dto.sexId },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateModeltypesSexDto): Promise<ModeltypesSexResponse> {
    await this.findOne(id);
    if (dto.modeltypeId !== undefined) await this.assertModeltypeExists(dto.modeltypeId);
    if (dto.sexId !== undefined) await this.assertSexExists(dto.sexId);
    const row = await this.prisma.modeltypeSex.update({
      where: { id },
      data: dto,
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.modeltypeSex.delete({ where: { id } });
  }

  private async assertModeltypeExists(id: number): Promise<void> {
    const exists = await this.prisma.modeltype.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Modeltype ${id} does not exist`);
  }

  private async assertSexExists(id: number): Promise<void> {
    const exists = await this.prisma.sex.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Sex ${id} does not exist`);
  }
}
