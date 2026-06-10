import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypesSexSizeDto } from './dto/create-modeltypes-sex-size.dto';
import { UpdateModeltypesSexSizeDto } from './dto/update-modeltypes-sex-size.dto';
import { ModeltypesSexSizesService, ModeltypesSexSizeResponse } from './modeltypes-sex-sizes.service';
export declare class ModeltypesSexSizesController {
    private readonly service;
    constructor(service: ModeltypesSexSizesService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<ModeltypesSexSizeResponse>>;
    findOne(id: number): Promise<ModeltypesSexSizeResponse>;
    create(dto: CreateModeltypesSexSizeDto): Promise<ModeltypesSexSizeResponse>;
    update(id: number, dto: UpdateModeltypesSexSizeDto): Promise<ModeltypesSexSizeResponse>;
    remove(id: number): Promise<void>;
}
