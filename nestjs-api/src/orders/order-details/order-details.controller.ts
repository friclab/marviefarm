import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { BatchCreateOrderDetailDto } from './dto/batch-create-order-detail.dto';
import {
  OrderDetailsService,
  OrderDetailResponse,
  UpdateOrderDetailDto,
  FabricOption,
  SizeOption,
  ArticleInfo,
} from './order-details.service';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly service: OrderDetailsService) {}

  // Static routes BEFORE :id to avoid routing conflicts

  // Replaces getFabricOptions() AJAX action → JSON
  @Get('fabric-options')
  getFabricOptions(@Query('articleId', ParseIntPipe) articleId: number): Promise<FabricOption[]> {
    return this.service.getFabricOptions(articleId);
  }

  // Replaces getModeltypessexessizeOptions() AJAX action → JSON
  @Get('size-options')
  getSizeOptions(@Query('articleId', ParseIntPipe) articleId: number): Promise<SizeOption[]> {
    return this.service.getSizeOptions(articleId);
  }

  // Replaces getArticleInfo() AJAX action (SQL injection fixed) → JSON
  @Get('article-info')
  getArticleInfo(@Query('articleId', ParseIntPipe) articleId: number): Promise<ArticleInfo> {
    return this.service.getArticleInfo(articleId);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<OrderDetailResponse>> {
    return this.service.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderDetailResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateOrderDetailDto): Promise<OrderDetailResponse> {
    return this.service.create(dto);
  }

  // Replaces add2() — batch insert with a single transaction
  @Post('batch')
  batchCreate(@Body() dto: BatchCreateOrderDetailDto): Promise<{ created: number }> {
    return this.service.batchCreate(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderDetailDto,
  ): Promise<OrderDetailResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
