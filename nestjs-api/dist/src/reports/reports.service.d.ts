import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private renderPdf;
    generateCostCsv(multiplier?: number): Promise<Buffer>;
    generateArticlesListPdf(): Promise<Buffer>;
    generateOrderExportPdf(orderId: number): Promise<Buffer>;
    generateChooseQuantityPdf(orderId: number, isWholesale?: boolean): Promise<Buffer>;
    generateOrderFormPdf(): Promise<Buffer>;
    private loadOrderForReport;
}
