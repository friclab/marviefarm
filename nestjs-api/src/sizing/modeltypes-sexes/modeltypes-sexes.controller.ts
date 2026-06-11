import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypesSexDto } from './dto/create-modeltypes-sex.dto';
import { UpdateModeltypesSexDto } from './dto/update-modeltypes-sex.dto';
import { ReassignModeltypesSexDto } from './dto/reassign-modeltypes-sex.dto';
import {
  ModeltypesSexesService,
  ModeltypesSexResponse,
  ModeltypesSexDependents,
} from './modeltypes-sexes.service';

@Controller('modeltypes-sexes')
export class ModeltypesSexesController {
  constructor(private readonly service: ModeltypesSexesService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<ModeltypesSexResponse>> {
    return this.service.findAll(pagination.page, pagination.limit);
  }

  @Get(':id/dependents')
  getDependents(@Param('id', ParseIntPipe) id: number): Promise<ModeltypesSexDependents> {
    return this.service.getDependents(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ModeltypesSexResponse> {
    return this.service.findOne(id);
  }

  @Post(':id/reassign')
  @HttpCode(HttpStatus.NO_CONTENT)
  reassign(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReassignModeltypesSexDto,
  ): Promise<void> {
    return this.service.reassignArticles(id, dto);
  }

  @Post()
  create(@Body() dto: CreateModeltypesSexDto): Promise<ModeltypesSexResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateModeltypesSexDto,
  ): Promise<ModeltypesSexResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
