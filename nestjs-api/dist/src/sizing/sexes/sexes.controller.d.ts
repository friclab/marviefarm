import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateSexDto } from './dto/create-sex.dto';
import { UpdateSexDto } from './dto/update-sex.dto';
import { SexesService, SexResponse } from './sexes.service';
export declare class SexesController {
    private readonly sexesService;
    constructor(sexesService: SexesService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<SexResponse>>;
    findOne(id: number): Promise<SexResponse>;
    create(dto: CreateSexDto): Promise<SexResponse>;
    update(id: number, dto: UpdateSexDto): Promise<SexResponse>;
    remove(id: number): Promise<void>;
}
