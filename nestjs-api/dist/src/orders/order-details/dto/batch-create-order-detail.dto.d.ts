declare class BatchItemDto {
    modeltypeSexSizeId: number;
    quantity: number;
}
export declare class BatchCreateOrderDetailDto {
    orderHeaderId: number;
    articleId: number;
    fabricId: number;
    note?: string;
    items: BatchItemDto[];
}
export {};
