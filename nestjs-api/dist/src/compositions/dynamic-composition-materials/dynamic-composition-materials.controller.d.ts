import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateDynamicCompositionMaterialDto } from './dto/create-dynamic-composition-material.dto';
import { UpdateDynamicCompositionMaterialDto } from './dto/update-dynamic-composition-material.dto';
import { DynamicCompositionMaterialsService, DynamicCompositionMaterialResponse } from './dynamic-composition-materials.service';
export declare class DynamicCompositionMaterialsController {
    private readonly service;
    constructor(service: DynamicCompositionMaterialsService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<DynamicCompositionMaterialResponse>>;
    findOne(id: number): Promise<DynamicCompositionMaterialResponse>;
    create(dto: CreateDynamicCompositionMaterialDto): Promise<DynamicCompositionMaterialResponse>;
    update(id: number, dto: UpdateDynamicCompositionMaterialDto): Promise<DynamicCompositionMaterialResponse>;
    remove(id: number): Promise<void>;
}
