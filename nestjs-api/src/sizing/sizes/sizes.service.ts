import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

export interface SizeResponse {
  id: number;
  code: string;
  displayName: string;
}

function toResponse(s: { id: number; code: string }): SizeResponse {
  return { ...s, displayName: s.code };
}

@Injectable()
export class SizesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<SizeResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.size.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { code: 'asc' }, // legacy: var $order = "code"
      }),
      this.prisma.size.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<SizeResponse> {
    const row = await this.prisma.size.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Size ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateSizeDto): Promise<SizeResponse> {
    const row = await this.prisma.size.create({ data: { code: dto.code } });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateSizeDto): Promise<SizeResponse> {
    await this.findOne(id);
    const row = await this.prisma.size.update({ where: { id }, data: dto });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.size.delete({ where: { id } });
  }
}
