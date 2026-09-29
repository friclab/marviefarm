import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ScopedPaginationDto } from '../../common/scoped-pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateFabricDto } from './dto/create-fabric.dto';
import { UpdateFabricDto } from './dto/update-fabric.dto';
import { BatchCreateFabricDto } from './dto/batch-create-fabric.dto';
import { FabricsService, FabricResponse } from './fabrics.service';

class FabricsQueryDto extends ScopedPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  articleId?: number;
}

@Controller('fabrics')
export class FabricsController {
  constructor(private readonly service: FabricsService) {}

  @Get()
  findAll(@Query() query: FabricsQueryDto): Promise<PaginatedResult<FabricResponse>> {
    return this.service.findAll(query.page, query.limit, query.articleId, query.collectionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<FabricResponse> {
    return this.service.findOne(id);
  }

  // Static route — must precede the `:id` routes (NestJS resolves top-to-bottom).
  @Post('batch')
  batchCreate(@Body() dto: BatchCreateFabricDto): Promise<{ created: number }> {
    return this.service.batchCreate(dto);
  }

  @Post()
  create(@Body() dto: CreateFabricDto): Promise<FabricResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFabricDto,
  ): Promise<FabricResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
