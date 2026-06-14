import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { ScopedPaginationDto } from '../../common/scoped-pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsService, MaterialResponse } from './materials.service';

@Controller('materials')
export class MaterialsController {
  constructor(private readonly service: MaterialsService) {}

  @Get()
  findAll(@Query() query: ScopedPaginationDto): Promise<PaginatedResult<MaterialResponse>> {
    return this.service.findAll(query.page, query.limit, query.collectionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MaterialResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMaterialDto): Promise<MaterialResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMaterialDto,
  ): Promise<MaterialResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
