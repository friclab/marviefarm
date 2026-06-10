import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateMaterialTypeDto } from './dto/create-material-type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material-type.dto';
import { MaterialTypesService, MaterialTypeResponse } from './material-types.service';
export declare class MaterialTypesController {
    private readonly service;
    constructor(service: MaterialTypesService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<MaterialTypeResponse>>;
    findOne(id: number): Promise<MaterialTypeResponse>;
    create(dto: CreateMaterialTypeDto): Promise<MaterialTypeResponse>;
    update(id: number, dto: UpdateMaterialTypeDto): Promise<MaterialTypeResponse>;
    remove(id: number): Promise<void>;
}
