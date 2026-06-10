import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { paginate, PaginatedResult } from '../common/paginated-result';
import { joinDisplay, fullPersonName } from '../common/display-name';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

export interface CustomerResponse {
  id: number;
  company: string | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  address: string | null;
  zipCode: string | null;
  city: string | null;
  district: string | null;
  country: string | null;
  vat: string | null;
  vatApplied: number | null;
  displayName: string;
}

function toResponse(row: {
  id: number;
  company: string | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  address: string | null;
  zipCode: string | null;
  city: string | null;
  district: string | null;
  country: string | null;
  vat: string | null;
  vatApplied: import('@prisma/client').Prisma.Decimal | null;
}): CustomerResponse {
  return {
    id: row.id,
    company: row.company,
    name: row.name,
    surname: row.surname,
    email: row.email,
    address: row.address,
    zipCode: row.zipCode,
    city: row.city,
    district: row.district,
    country: row.country,
    vat: row.vat,
    vatApplied: row.vatApplied !== null ? Number(row.vatApplied) : null,
    displayName: joinDisplay([row.company, fullPersonName(row.name, row.surname)]),
  };
}

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<CustomerResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.customer.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ company: 'asc' }, { surname: 'asc' }],
      }),
      this.prisma.customer.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<CustomerResponse> {
    const row = await this.prisma.customer.findUnique({ where: { id } });
    if (!row) throw new NotFoundException(`Customer ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateCustomerDto): Promise<CustomerResponse> {
    const row = await this.prisma.customer.create({ data: dto });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateCustomerDto): Promise<CustomerResponse> {
    await this.findOne(id);
    const row = await this.prisma.customer.update({ where: { id }, data: dto });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    const orderCount = await this.prisma.orderHeader.count({ where: { customerId: id } });
    if (orderCount > 0) {
      throw new ConflictException(`Cannot delete: ${orderCount} order(s) reference this customer`);
    }
    await this.prisma.customer.delete({ where: { id } });
  }
}
