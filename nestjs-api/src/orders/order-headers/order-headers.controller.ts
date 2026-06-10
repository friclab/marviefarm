import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateOrderHeaderDto } from './dto/create-order-header.dto';
import { UpdateOrderHeaderDto } from './dto/update-order-header.dto';
import {
  OrderHeadersService,
  OrderHeaderListItem,
  OrderHeaderDetailResponse,
} from './order-headers.service';

@Controller('order-headers')
export class OrderHeadersController {
  constructor(private readonly service: OrderHeadersService) {}

  // Static routes BEFORE :id
  @Get('next-number')
  getNextNumber(): Promise<{ nextId: number }> {
    return this.service.getNextId();
  }

  @Get()
  findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<OrderHeaderListItem>> {
    return this.service.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderHeaderDetailResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateOrderHeaderDto): Promise<OrderHeaderDetailResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderHeaderDto,
  ): Promise<OrderHeaderDetailResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
