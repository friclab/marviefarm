import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateUnitMeasurementDto } from './dto/create-unit-measurement.dto';
import { UpdateUnitMeasurementDto } from './dto/update-unit-measurement.dto';
import { UnitMeasurementsService, UnitMeasurementResponse } from './unit-measurements.service';
export declare class UnitMeasurementsController {
    private readonly service;
    constructor(service: UnitMeasurementsService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<UnitMeasurementResponse>>;
    findOne(id: number): Promise<UnitMeasurementResponse>;
    create(dto: CreateUnitMeasurementDto): Promise<UnitMeasurementResponse>;
    update(id: number, dto: UpdateUnitMeasurementDto): Promise<UnitMeasurementResponse>;
    remove(id: number): Promise<void>;
}
