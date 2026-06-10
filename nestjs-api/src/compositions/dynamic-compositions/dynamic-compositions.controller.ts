import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateDynamicCompositionDto } from './dto/create-dynamic-composition.dto';
import { UpdateDynamicCompositionDto } from './dto/update-dynamic-composition.dto';
import { DynamicCompositionsService, DynamicCompositionResponse } from './dynamic-compositions.service';

@Controller('dynamic-compositions')
export class DynamicCompositionsController {
  constructor(private readonly service: DynamicCompositionsService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<DynamicCompositionResponse>> {
    return this.service.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DynamicCompositionResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDynamicCompositionDto): Promise<DynamicCompositionResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDynamicCompositionDto,
  ): Promise<DynamicCompositionResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
