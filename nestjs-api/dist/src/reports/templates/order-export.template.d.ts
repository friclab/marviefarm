interface FabricRow {
    qty: number | null;
    sizeCode: string;
    sexCode: string;
    articleName: string;
    fabricCode: string;
    fabricDescription: string | null;
    price: number | null;
    note: string | null;
}
interface OrderData {
    orderNumber: string | null;
    date: string | null;
    description: string | null;
    payment: string | null;
    note: string | null;
    customer: {
        company: string | null;
        name: string | null;
        surname: string | null;
        email: string | null;
        address: string | null;
        zipCode: string | null;
        city: string | null;
        country: string | null;
        vat: string | null;
        vatApplied: number | null;
    };
    discount: number | null;
    details: FabricRow[];
    totals: {
        partialTotal: number;
        discountAmount: number;
        subtotal: number;
        vat: number;
        grandTotal: number;
    };
}
export declare function renderOrderExport(data: OrderData): string;
export {};
