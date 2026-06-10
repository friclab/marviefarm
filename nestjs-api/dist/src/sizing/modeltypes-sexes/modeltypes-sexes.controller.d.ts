import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypesSexDto } from './dto/create-modeltypes-sex.dto';
import { UpdateModeltypesSexDto } from './dto/update-modeltypes-sex.dto';
import { ModeltypesSexesService, ModeltypesSexResponse } from './modeltypes-sexes.service';
export declare class ModeltypesSexesController {
    private readonly service;
    constructor(service: ModeltypesSexesService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<ModeltypesSexResponse>>;
    findOne(id: number): Promise<ModeltypesSexResponse>;
    create(dto: CreateModeltypesSexDto): Promise<ModeltypesSexResponse>;
    update(id: number, dto: UpdateModeltypesSexDto): Promise<ModeltypesSexResponse>;
    remove(id: number): Promise<void>;
}
