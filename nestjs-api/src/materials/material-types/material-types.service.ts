import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay } from '../../common/display-name';
import { CreateMaterialTypeDto } from './dto/create-material-type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material-type.dto';

export interface MaterialTypeResponse {
  id: number;
  code: string;
  description: string | null;
  // Legacy pattern: '%s - %s' → "code - description"
  displayName: string;
}

type MtRow = { id: number; code: string; description: string | null };

function toResponse(mt: MtRow): MaterialTypeResponse {
  return { ...mt, displayName: joinDisplay([mt.code, mt.description]) };
}

@Injectable()
export class MaterialTypesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<MaterialTypeResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.materialtype.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { code: 'asc' },
      }),
      this.prisma.materialtype.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<MaterialTypeResponse> {
    const row = await this.prisma.materialtype.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`MaterialType ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateMaterialTypeDto): Promise<MaterialTypeResponse> {
    const row = await this.prisma.materialtype.create({ data: dto });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateMaterialTypeDto): Promise<MaterialTypeResponse> {
    await this.findOne(id);
    const row = await this.prisma.materialtype.update({ where: { id }, data: dto });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.materialtype.delete({ where: { id } });
  }
}
