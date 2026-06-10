import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateMaterialTypeDto } from './dto/create-material-type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material-type.dto';
import { MaterialTypesService, MaterialTypeResponse } from './material-types.service';

@Controller('material-types')
export class MaterialTypesController {
  constructor(private readonly service: MaterialTypesService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<MaterialTypeResponse>> {
    return this.service.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MaterialTypeResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMaterialTypeDto): Promise<MaterialTypeResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMaterialTypeDto,
  ): Promise<MaterialTypeResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
