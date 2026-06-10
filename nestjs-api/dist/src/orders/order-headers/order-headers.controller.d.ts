import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateOrderHeaderDto } from './dto/create-order-header.dto';
import { UpdateOrderHeaderDto } from './dto/update-order-header.dto';
import { OrderHeadersService, OrderHeaderListItem, OrderHeaderDetailResponse } from './order-headers.service';
export declare class OrderHeadersController {
    private readonly service;
    constructor(service: OrderHeadersService);
    getNextNumber(): Promise<{
        nextId: number;
    }>;
    findAll(pagination: PaginationDto): Promise<PaginatedResult<OrderHeaderListItem>>;
    findOne(id: number): Promise<OrderHeaderDetailResponse>;
    create(dto: CreateOrderHeaderDto): Promise<OrderHeaderDetailResponse>;
    update(id: number, dto: UpdateOrderHeaderDto): Promise<OrderHeaderDetailResponse>;
    remove(id: number): Promise<void>;
}
