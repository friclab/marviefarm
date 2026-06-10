import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateFixedCompositionMaterialDto } from './dto/create-fixed-composition-material.dto';
import { UpdateFixedCompositionMaterialDto } from './dto/update-fixed-composition-material.dto';
import { FixedCompositionMaterialsService, FixedCompositionMaterialResponse } from './fixed-composition-materials.service';
export declare class FixedCompositionMaterialsController {
    private readonly service;
    constructor(service: FixedCompositionMaterialsService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<FixedCompositionMaterialResponse>>;
    findOne(id: number): Promise<FixedCompositionMaterialResponse>;
    create(dto: CreateFixedCompositionMaterialDto): Promise<FixedCompositionMaterialResponse>;
    update(id: number, dto: UpdateFixedCompositionMaterialDto): Promise<FixedCompositionMaterialResponse>;
    remove(id: number): Promise<void>;
}
