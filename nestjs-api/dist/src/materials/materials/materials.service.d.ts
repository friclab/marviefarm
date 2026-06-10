import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { SupplierResponse } from '../suppliers/suppliers.service';
import { UnitMeasurementResponse } from '../unit-measurements/unit-measurements.service';
import { MaterialTypeResponse } from '../material-types/material-types.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
export interface MaterialResponse {
    id: number;
    code: string;
    description: string | null;
    price: number | null;
    supplierId: number | null;
    unitmeasurementId: number | null;
    supplier: SupplierResponse | null;
    unitmeasurement: UnitMeasurementResponse | null;
    materialtypes: MaterialTypeResponse[];
    displayName: string;
}
export declare class MaterialsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<MaterialResponse>>;
    findOne(id: number): Promise<MaterialResponse>;
    create(dto: CreateMaterialDto): Promise<MaterialResponse>;
    update(id: number, dto: UpdateMaterialDto): Promise<MaterialResponse>;
    remove(id: number): Promise<void>;
    private assertSupplierExists;
    private assertUnitMeasurementExists;
    private assertMaterialTypesExist;
}
