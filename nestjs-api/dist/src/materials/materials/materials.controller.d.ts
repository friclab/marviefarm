import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsService, MaterialResponse } from './materials.service';
export declare class MaterialsController {
    private readonly service;
    constructor(service: MaterialsService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<MaterialResponse>>;
    findOne(id: number): Promise<MaterialResponse>;
    create(dto: CreateMaterialDto): Promise<MaterialResponse>;
    update(id: number, dto: UpdateMaterialDto): Promise<MaterialResponse>;
    remove(id: number): Promise<void>;
}
