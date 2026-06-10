import { PaginationDto } from '../common/pagination.dto';
import { PaginatedResult } from '../common/paginated-result';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersService, CustomerResponse } from './customers.service';
export declare class CustomersController {
    private readonly service;
    constructor(service: CustomersService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<CustomerResponse>>;
    findOne(id: number): Promise<CustomerResponse>;
    create(dto: CreateCustomerDto): Promise<CustomerResponse>;
    update(id: number, dto: UpdateCustomerDto): Promise<CustomerResponse>;
    remove(id: number): Promise<void>;
}
