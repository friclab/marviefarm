import {
  Controller, Get, Param, ParseIntPipe,
  Query, Res, StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { ReportsService, CostPreview, MaterialConsumption } from './reports.service';
import {
  CostCalculationQueryDto, CostPreviewQueryDto, MaterialConsumptionQueryDto,
} from './dto/report-query.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  // ── Cost calculation CSV ───────────────────────────────────────────────────

  @Get('cost-calculation')
  async costCalculation(
    @Query() query: CostCalculationQueryDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const buffer = await this.service.generateCostCsv(query.multiplier, query.detailed, query.collectionId);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="costX${query.multiplier}.csv"`);
    return new StreamableFile(buffer);
  }

  // ── Cost calculation preview (interactive JSON) ────────────────────────────

  @Get('cost-preview')
  costPreview(@Query() query: CostPreviewQueryDto): Promise<CostPreview> {
    return this.service.getCostPreview(query.multiplier, query.collectionId);
  }

  // ── Material consumption from orders (interactive JSON) ─────────────────────

  @Get('material-consumption')
  materialConsumption(@Query() query: MaterialConsumptionQueryDto): Promise<MaterialConsumption> {
    return this.service.getMaterialConsumption(query.orderId, query.collectionId);
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
