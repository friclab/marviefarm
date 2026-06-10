import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay, fullPersonName } from '../../common/display-name';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

export interface SupplierResponse {
  id: number;
  company: string | null;
  name: string | null;
  surname: string | null;
  // Legacy pattern: '%s - %s %s' → "company - name surname"
  displayName: string;
}

type SupplierRow = { id: number; company: string | null; name: string | null; surname: string | null };

function toResponse(s: SupplierRow): SupplierResponse {
  return {
    ...s,
    displayName: joinDisplay([s.company, fullPersonName(s.name, s.surname)]),
  };
}

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<SupplierResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.supplier.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { company: 'asc' },
      }),
      this.prisma.supplier.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<SupplierResponse> {
    const row = await this.prisma.supplier.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Supplier ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateSupplierDto): Promise<SupplierResponse> {
    const row = await this.prisma.supplier.create({ data: dto });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateSupplierDto): Promise<SupplierResponse> {
    await this.findOne(id);
    const row = await this.prisma.supplier.update({ where: { id }, data: dto });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.supplier.delete({ where: { id } });
  }
}
