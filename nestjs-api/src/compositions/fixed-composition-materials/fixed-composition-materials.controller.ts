import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateFixedCompositionMaterialDto } from './dto/create-fixed-composition-material.dto';
import { UpdateFixedCompositionMaterialDto } from './dto/update-fixed-composition-material.dto';
import {
  FixedCompositionMaterialsService,
  FixedCompositionMaterialResponse,
} from './fixed-composition-materials.service';

@Controller('fixed-composition-materials')
export class FixedCompositionMaterialsController {
  constructor(private readonly service: FixedCompositionMaterialsService) {}

  @Get()
  findAll(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResult<FixedCompositionMaterialResponse>> {
    return this.service.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FixedCompositionMaterialResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(
    @Body() dto: CreateFixedCompositionMaterialDto,
  ): Promise<FixedCompositionMaterialResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFixedCompositionMaterialDto,
  ): Promise<FixedCompositionMaterialResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
