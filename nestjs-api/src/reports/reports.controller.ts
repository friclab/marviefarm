import {
  Controller, Get, Param, ParseIntPipe, ParseFloatPipe, ParseBoolPipe,
  Query, Res, StreamableFile, DefaultValuePipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ReportsService, CostPreview, MaterialConsumption } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  // ── Cost calculation CSV ───────────────────────────────────────────────────

  @Get('cost-calculation')
  async costCalculation(
    @Query('multiplier', new DefaultValuePipe(1), ParseFloatPipe) multiplier: number,
    @Query('detailed', new DefaultValuePipe(false), ParseBoolPipe) detailed: boolean,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const buffer = await this.service.generateCostCsv(multiplier, detailed);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="costX${multiplier}.csv"`);
    return new StreamableFile(buffer);
  }

  // ── Cost calculation preview (interactive JSON) ────────────────────────────

  @Get('cost-preview')
  costPreview(
    @Query('multiplier', new DefaultValuePipe(1), ParseFloatPipe) multiplier: number,
  ): Promise<CostPreview> {
    return this.service.getCostPreview(multiplier);
  }

  // ── Material consumption from orders (interactive JSON) ─────────────────────

  @Get('material-consumption')
  materialConsumption(
    @Query('orderId', new ParseIntPipe({ optional: true })) orderId?: number,
  ): Promise<MaterialConsumption> {
    return this.service.getMaterialConsumption(orderId);
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
