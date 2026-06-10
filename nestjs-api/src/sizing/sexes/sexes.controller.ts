import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateSexDto } from './dto/create-sex.dto';
import { UpdateSexDto } from './dto/update-sex.dto';
import { SexesService, SexResponse } from './sexes.service';

@Controller('sexes')
export class SexesController {
  constructor(private readonly sexesService: SexesService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<SexResponse>> {
    return this.sexesService.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SexResponse> {
    return this.sexesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSexDto): Promise<SexResponse> {
    return this.sexesService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSexDto,
  ): Promise<SexResponse> {
    return this.sexesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sexesService.remove(id);
  }
}
