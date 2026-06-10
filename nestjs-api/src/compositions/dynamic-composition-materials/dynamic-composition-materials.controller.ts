import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateDynamicCompositionMaterialDto } from './dto/create-dynamic-composition-material.dto';
import { UpdateDynamicCompositionMaterialDto } from './dto/update-dynamic-composition-material.dto';
import {
  DynamicCompositionMaterialsService,
  DynamicCompositionMaterialResponse,
} from './dynamic-composition-materials.service';

@Controller('dynamic-composition-materials')
export class DynamicCompositionMaterialsController {
  constructor(private readonly service: DynamicCompositionMaterialsService) {}

  @Get()
  findAll(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResult<DynamicCompositionMaterialResponse>> {
    return this.service.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DynamicCompositionMaterialResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(
    @Body() dto: CreateDynamicCompositionMaterialDto,
  ): Promise<DynamicCompositionMaterialResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDynamicCompositionMaterialDto,
  ): Promise<DynamicCompositionMaterialResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
