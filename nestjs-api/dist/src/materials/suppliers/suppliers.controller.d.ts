import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService, SupplierResponse } from './suppliers.service';
export declare class SuppliersController {
    private readonly service;
    constructor(service: SuppliersService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<SupplierResponse>>;
    findOne(id: number): Promise<SupplierResponse>;
    create(dto: CreateSupplierDto): Promise<SupplierResponse>;
    update(id: number, dto: UpdateSupplierDto): Promise<SupplierResponse>;
    remove(id: number): Promise<void>;
}
