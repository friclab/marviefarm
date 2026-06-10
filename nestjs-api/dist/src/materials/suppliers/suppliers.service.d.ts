import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export interface SupplierResponse {
    id: number;
    company: string | null;
    name: string | null;
    surname: string | null;
    displayName: string;
}
export declare class SuppliersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<SupplierResponse>>;
    findOne(id: number): Promise<SupplierResponse>;
    create(dto: CreateSupplierDto): Promise<SupplierResponse>;
    update(id: number, dto: UpdateSupplierDto): Promise<SupplierResponse>;
    remove(id: number): Promise<void>;
}
