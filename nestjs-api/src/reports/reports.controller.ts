import {
  Controller, Get, Param, ParseIntPipe, ParseFloatPipe,
  Query, Res, StreamableFile, DefaultValuePipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  // ── Cost calculation CSV ───────────────────────────────────────────────────

  @Get('cost-calculation')
  async costCalculation(
    @Query('multiplier', new DefaultValuePipe(1), ParseFloatPipe) multiplier: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const buffer = await this.service.generateCostCsv(multiplier);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="cost_calculation.csv"');
    return new StreamableFile(buffer);
  }

  // ── Articles list PDF ──────────────────────────────────────────────────────

  @Get('articles-list')
  async articlesList(@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    const buffer = await this.service.generateArticlesListPdf();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="articles_list.pdf"');
    return new StreamableFile(buffer);
  }

  // Static route BEFORE :id
  @Get('orders/form')
  async orderForm(@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    const buffer = await this.service.generateOrderFormPdf();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="order_form.pdf"');
    return new StreamableFile(buffer);
  }

  @Get('orders/:id/export')
  async orderExport(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const buffer = await this.service.generateOrderExportPdf(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="order_${id}.pdf"`);
    return new StreamableFile(buffer);
  }

  @Get('orders/:id/choose-quantity')
  async chooseQuantity(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const buffer = await this.service.generateChooseQuantityPdf(id, false);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="order_${id}_qty.pdf"`);
    return new StreamableFile(buffer);
  }

  @Get('orders/:id/choose-quantity-ws')
  async chooseQuantityWs(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const buffer = await this.service.generateChooseQuantityPdf(id, true);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="order_${id}_qty_ws.pdf"`);
    return new StreamableFile(buffer);
  }
}
