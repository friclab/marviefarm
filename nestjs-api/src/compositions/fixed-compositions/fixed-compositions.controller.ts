import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateFixedCompositionDto } from './dto/create-fixed-composition.dto';
import { UpdateFixedCompositionDto } from './dto/update-fixed-composition.dto';
import { FixedCompositionsService, FixedCompositionResponse } from './fixed-compositions.service';

@Controller('fixed-compositions')
export class FixedCompositionsController {
  constructor(private readonly service: FixedCompositionsService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<FixedCompositionResponse>> {
    return this.service.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FixedCompositionResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateFixedCompositionDto): Promise<FixedCompositionResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFixedCompositionDto,
  ): Promise<FixedCompositionResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
