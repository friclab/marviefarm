import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay } from '../../common/display-name';
import { CreateUnitMeasurementDto } from './dto/create-unit-measurement.dto';
import { UpdateUnitMeasurementDto } from './dto/update-unit-measurement.dto';

export interface UnitMeasurementResponse {
  id: number;
  code: string;
  description: string | null;
  // Legacy pattern: '%s - %s' → "code - description"
  displayName: string;
}

type UmRow = { id: number; code: string; description: string | null };

function toResponse(um: UmRow): UnitMeasurementResponse {
  return { ...um, displayName: joinDisplay([um.code, um.description]) };
}

@Injectable()
export class UnitMeasurementsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<UnitMeasurementResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.unitmeasurement.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { code: 'asc' },
      }),
      this.prisma.unitmeasurement.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<UnitMeasurementResponse> {
    const row = await this.prisma.unitmeasurement.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`UnitMeasurement ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateUnitMeasurementDto): Promise<UnitMeasurementResponse> {
    const row = await this.prisma.unitmeasurement.create({ data: dto });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateUnitMeasurementDto): Promise<UnitMeasurementResponse> {
    await this.findOne(id);
    const row = await this.prisma.unitmeasurement.update({ where: { id }, data: dto });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.unitmeasurement.delete({ where: { id } });
  }
}
