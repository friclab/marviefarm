import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypeDto } from './dto/create-modeltype.dto';
import { UpdateModeltypeDto } from './dto/update-modeltype.dto';

export interface ModeltypeResponse {
  id: number;
  code: string;
  description: string | null;
  displayName: string;
}

function toResponse(m: { id: number; code: string; description: string | null }): ModeltypeResponse {
  return { ...m, displayName: `${m.code} - ${m.description ?? ''}`.trimEnd().replace(/ -$/, '') };
}

@Injectable()
export class ModeltypesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<ModeltypeResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.modeltype.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { code: 'asc' },
      }),
      this.prisma.modeltype.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<ModeltypeResponse> {
    const row = await this.prisma.modeltype.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Modeltype ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateModeltypeDto): Promise<ModeltypeResponse> {
    const row = await this.prisma.modeltype.create({ data: dto });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateModeltypeDto): Promise<ModeltypeResponse> {
    await this.findOne(id);
    const row = await this.prisma.modeltype.update({ where: { id }, data: dto });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.modeltype.delete({ where: { id } });
  }
}
