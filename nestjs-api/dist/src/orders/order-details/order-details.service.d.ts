import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { BatchCreateOrderDetailDto } from './dto/batch-create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
export { UpdateOrderDetailDto };
export interface OrderDetailResponse {
    id: number;
    orderHeaderId: number;
    articleId: number;
    fabricId: number | null;
    modeltypeSexSizeId: number | null;
    quantity: number | null;
    note: string | null;
    article: {
        id: number;
        name: string;
        description: string | null;
        displayName: string;
    };
    fabric: {
        id: number;
        code: string;
        description: string | null;
        price: number | null;
        displayName: string;
    } | null;
    modeltypeSexSize: {
        id: number;
        size: {
            id: number;
            code: string;
        };
        modeltypeSex: {
            id: number;
            modeltype: {
                id: number;
                code: string;
            };
            sex: {
                id: number;
                code: string;
            };
        };
    } | null;
}
export interface FabricOption {
    id: number;
    code: string;
    description: string | null;
    price: number | null;
    displayName: string;
}
export interface SizeOption {
    modeltypeSexSizeId: number;
    sizeId: number;
    sizeCode: string;
}
export interface ArticleInfo {
    articleId: number;
    name: string;
    fabrics: FabricOption[];
}
export declare class OrderDetailsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<OrderDetailResponse>>;
    findOne(id: number): Promise<OrderDetailResponse>;
    create(dto: CreateOrderDetailDto): Promise<OrderDetailResponse>;
    update(id: number, dto: UpdateOrderDetailDto): Promise<OrderDetailResponse>;
    remove(id: number): Promise<void>;
    batchCreate(dto: BatchCreateOrderDetailDto): Promise<{
        created: number;
    }>;
    getFabricOptions(articleId: number): Promise<FabricOption[]>;
    getSizeOptions(articleId: number): Promise<SizeOption[]>;
    getArticleInfo(articleId: number): Promise<ArticleInfo>;
    private assertOrderHeaderExists;
    private assertArticleExists;
    private assertFabricExists;
    private assertSizeExists;
}
