import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateDynamicCompositionDto } from './dto/create-dynamic-composition.dto';
import { UpdateDynamicCompositionDto } from './dto/update-dynamic-composition.dto';
import { DynamicCompositionsService, DynamicCompositionResponse } from './dynamic-compositions.service';
export declare class DynamicCompositionsController {
    private readonly service;
    constructor(service: DynamicCompositionsService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<DynamicCompositionResponse>>;
    findOne(id: number): Promise<DynamicCompositionResponse>;
    create(dto: CreateDynamicCompositionDto): Promise<DynamicCompositionResponse>;
    update(id: number, dto: UpdateDynamicCompositionDto): Promise<DynamicCompositionResponse>;
    remove(id: number): Promise<void>;
}
