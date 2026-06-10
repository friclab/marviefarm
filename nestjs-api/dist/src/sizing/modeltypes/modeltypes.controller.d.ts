import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypeDto } from './dto/create-modeltype.dto';
import { UpdateModeltypeDto } from './dto/update-modeltype.dto';
import { ModeltypesService, ModeltypeResponse } from './modeltypes.service';
export declare class ModeltypesController {
    private readonly modeltypesService;
    constructor(modeltypesService: ModeltypesService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<ModeltypeResponse>>;
    findOne(id: number): Promise<ModeltypeResponse>;
    create(dto: CreateModeltypeDto): Promise<ModeltypeResponse>;
    update(id: number, dto: UpdateModeltypeDto): Promise<ModeltypeResponse>;
    remove(id: number): Promise<void>;
}
