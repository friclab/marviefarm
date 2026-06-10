import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateFixedCompositionDto } from './dto/create-fixed-composition.dto';
import { UpdateFixedCompositionDto } from './dto/update-fixed-composition.dto';
import { FixedCompositionsService, FixedCompositionResponse } from './fixed-compositions.service';
export declare class FixedCompositionsController {
    private readonly service;
    constructor(service: FixedCompositionsService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<FixedCompositionResponse>>;
    findOne(id: number): Promise<FixedCompositionResponse>;
    create(dto: CreateFixedCompositionDto): Promise<FixedCompositionResponse>;
    update(id: number, dto: UpdateFixedCompositionDto): Promise<FixedCompositionResponse>;
    remove(id: number): Promise<void>;
}
