import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResult } from '../common/paginated-result';
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
export declare class CustomersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<CustomerResponse>>;
    findOne(id: number): Promise<CustomerResponse>;
    create(dto: CreateCustomerDto): Promise<CustomerResponse>;
    update(id: number, dto: UpdateCustomerDto): Promise<CustomerResponse>;
    remove(id: number): Promise<void>;
}
