import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypeDto } from './dto/create-modeltype.dto';
import { UpdateModeltypeDto } from './dto/update-modeltype.dto';
import { ModeltypesService, ModeltypeResponse } from './modeltypes.service';

@Controller('modeltypes')
export class ModeltypesController {
  constructor(private readonly modeltypesService: ModeltypesService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<ModeltypeResponse>> {
    return this.modeltypesService.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ModeltypeResponse> {
    return this.modeltypesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateModeltypeDto): Promise<ModeltypeResponse> {
    return this.modeltypesService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateModeltypeDto,
  ): Promise<ModeltypeResponse> {
    return this.modeltypesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.modeltypesService.remove(id);
  }
}
