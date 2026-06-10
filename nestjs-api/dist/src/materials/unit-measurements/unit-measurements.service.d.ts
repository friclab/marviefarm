import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateUnitMeasurementDto } from './dto/create-unit-measurement.dto';
import { UpdateUnitMeasurementDto } from './dto/update-unit-measurement.dto';
export interface UnitMeasurementResponse {
    id: number;
    code: string;
    description: string | null;
    displayName: string;
}
export declare class UnitMeasurementsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<UnitMeasurementResponse>>;
    findOne(id: number): Promise<UnitMeasurementResponse>;
    create(dto: CreateUnitMeasurementDto): Promise<UnitMeasurementResponse>;
    update(id: number, dto: UpdateUnitMeasurementDto): Promise<UnitMeasurementResponse>;
    remove(id: number): Promise<void>;
}
