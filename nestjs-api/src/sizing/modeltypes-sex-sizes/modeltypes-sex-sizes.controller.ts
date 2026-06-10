import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypesSexSizeDto } from './dto/create-modeltypes-sex-size.dto';
import { UpdateModeltypesSexSizeDto } from './dto/update-modeltypes-sex-size.dto';
import { ModeltypesSexSizesService, ModeltypesSexSizeResponse } from './modeltypes-sex-sizes.service';

@Controller('modeltypes-sex-sizes')
export class ModeltypesSexSizesController {
  constructor(private readonly service: ModeltypesSexSizesService) {}

  @Get()
  findAll(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResult<ModeltypesSexSizeResponse>> {
    return this.service.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ModeltypesSexSizeResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateModeltypesSexSizeDto): Promise<ModeltypesSexSizeResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateModeltypesSexSizeDto,
  ): Promise<ModeltypesSexSizeResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
