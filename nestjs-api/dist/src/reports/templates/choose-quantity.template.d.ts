export interface SizeGrid {
    sexCode: string;
    articleName: string;
    articleDescription: string | null;
    fabricCode: string;
    fabricDescription: string | null;
    price: number | null;
    sizes: Array<{
        sizeCode: string;
        modeltypeSexSizeId: number;
        quantity: number | null;
    }>;
}
export interface ChooseQuantityData {
    orderNumber: string | null;
    customerName: string;
    date: string | null;
    isWholesale: boolean;
    grids: SizeGrid[];
}
export declare function renderChooseQuantity(data: ChooseQuantityData): string;
