import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { CreateSexDto } from './dto/create-sex.dto';
import { UpdateSexDto } from './dto/update-sex.dto';

export interface SexResponse {
  id: number;
  code: string;
  displayName: string;
}

function toResponse(sex: { id: number; code: string }): SexResponse {
  return { ...sex, displayName: sex.code };
}

@Injectable()
export class SexesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<SexResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.sex.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { code: 'asc' },
      }),
      this.prisma.sex.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<SexResponse> {
    const sex = await this.prisma.sex.findUnique({ where: { id } });
    if (!sex) throw new NotFoundException(`Sex ${id} not found`);
    return toResponse(sex);
  }

  async create(dto: CreateSexDto): Promise<SexResponse> {
    const sex = await this.prisma.sex.create({ data: { code: dto.code } });
    return toResponse(sex);
  }

  async update(id: number, dto: UpdateSexDto): Promise<SexResponse> {
    await this.findOne(id); // throws 404 if missing
    const sex = await this.prisma.sex.update({ where: { id }, data: dto });
    return toResponse(sex);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.sex.delete({ where: { id } });
  }
}
