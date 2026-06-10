import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateFabricDto } from './dto/create-fabric.dto';
import { UpdateFabricDto } from './dto/update-fabric.dto';
import { FabricsService, FabricResponse } from './fabrics.service';
declare class FabricsQueryDto extends PaginationDto {
    articleId?: number;
}
export declare class FabricsController {
    private readonly service;
    constructor(service: FabricsService);
    findAll(query: FabricsQueryDto): Promise<PaginatedResult<FabricResponse>>;
    findOne(id: number): Promise<FabricResponse>;
    create(dto: CreateFabricDto): Promise<FabricResponse>;
    update(id: number, dto: UpdateFabricDto): Promise<FabricResponse>;
    remove(id: number): Promise<void>;
}
export {};
