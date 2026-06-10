import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly service;
    constructor(service: ReportsService);
    costCalculation(multiplier: number, res: Response): Promise<StreamableFile>;
    articlesList(res: Response): Promise<StreamableFile>;
    orderForm(res: Response): Promise<StreamableFile>;
    orderExport(id: number, res: Response): Promise<StreamableFile>;
    chooseQuantity(id: number, res: Response): Promise<StreamableFile>;
    chooseQuantityWs(id: number, res: Response): Promise<StreamableFile>;
}
