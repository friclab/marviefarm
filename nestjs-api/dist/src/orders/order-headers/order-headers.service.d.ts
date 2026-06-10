import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateOrderHeaderDto } from './dto/create-order-header.dto';
import { UpdateOrderHeaderDto } from './dto/update-order-header.dto';
export interface OrderTotals {
    partialTotal: number;
    discountAmount: number;
    subtotal: number;
    vat: number;
    grandTotal: number;
}
export interface OrderHeaderListItem {
    id: number;
    customerId: number;
    collectionId: number | null;
    orderNumber: string | null;
    description: string | null;
    date: string | null;
    discount: number | null;
    payment: string | null;
    note: string | null;
    displayName: string;
    customer: {
        id: number;
        company: string | null;
        name: string | null;
        surname: string | null;
        displayName: string;
    };
    collection: {
        id: number;
        name: string;
    } | null;
}
export interface OrderDetailSnippet {
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
export interface OrderHeaderDetailResponse extends OrderHeaderListItem {
    orderDetails: OrderDetailSnippet[];
    totals: OrderTotals;
}
export declare class OrderHeadersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<OrderHeaderListItem>>;
    findOne(id: number): Promise<OrderHeaderDetailResponse>;
    getNextId(): Promise<{
        nextId: number;
    }>;
    create(dto: CreateOrderHeaderDto): Promise<OrderHeaderDetailResponse>;
    update(id: number, dto: UpdateOrderHeaderDto): Promise<OrderHeaderDetailResponse>;
    remove(id: number): Promise<void>;
    private assertCustomerExists;
    private assertCollectionExists;
}
