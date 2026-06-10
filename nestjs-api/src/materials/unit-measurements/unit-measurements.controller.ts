import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateUnitMeasurementDto } from './dto/create-unit-measurement.dto';
import { UpdateUnitMeasurementDto } from './dto/update-unit-measurement.dto';
import { UnitMeasurementsService, UnitMeasurementResponse } from './unit-measurements.service';

@Controller('unit-measurements')
export class UnitMeasurementsController {
  constructor(private readonly service: UnitMeasurementsService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto): Promise<PaginatedResult<UnitMeasurementResponse>> {
    return this.service.findAll(pagination.page, pagination.limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UnitMeasurementResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUnitMeasurementDto): Promise<UnitMeasurementResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUnitMeasurementDto,
  ): Promise<UnitMeasurementResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
