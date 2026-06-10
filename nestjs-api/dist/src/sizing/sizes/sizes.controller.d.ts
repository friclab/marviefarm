import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SizesService, SizeResponse } from './sizes.service';
export declare class SizesController {
    private readonly sizesService;
    constructor(sizesService: SizesService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<SizeResponse>>;
    findOne(id: number): Promise<SizeResponse>;
    create(dto: CreateSizeDto): Promise<SizeResponse>;
    update(id: number, dto: UpdateSizeDto): Promise<SizeResponse>;
    remove(id: number): Promise<void>;
}
