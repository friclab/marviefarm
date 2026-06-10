import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionsService, CollectionResponse } from './collections.service';
export declare class CollectionsController {
    private readonly service;
    constructor(service: CollectionsService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<CollectionResponse>>;
    findOne(id: number): Promise<CollectionResponse>;
    create(dto: CreateCollectionDto): Promise<CollectionResponse>;
    update(id: number, dto: UpdateCollectionDto): Promise<CollectionResponse>;
    remove(id: number): Promise<void>;
}
