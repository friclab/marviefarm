import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { BatchCreateOrderDetailDto } from './dto/batch-create-order-detail.dto';
import { OrderDetailsService, OrderDetailResponse, UpdateOrderDetailDto, FabricOption, SizeOption, ArticleInfo } from './order-details.service';
export declare class OrderDetailsController {
    private readonly service;
    constructor(service: OrderDetailsService);
    getFabricOptions(articleId: number): Promise<FabricOption[]>;
    getSizeOptions(articleId: number): Promise<SizeOption[]>;
    getArticleInfo(articleId: number): Promise<ArticleInfo>;
    findAll(pagination: PaginationDto): Promise<PaginatedResult<OrderDetailResponse>>;
    findOne(id: number): Promise<OrderDetailResponse>;
    create(dto: CreateOrderDetailDto): Promise<OrderDetailResponse>;
    batchCreate(dto: BatchCreateOrderDetailDto): Promise<{
        created: number;
    }>;
    update(id: number, dto: UpdateOrderDetailDto): Promise<OrderDetailResponse>;
    remove(id: number): Promise<void>;
}
