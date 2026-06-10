import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
export interface CollectionResponse {
    id: number;
    name: string;
    displayName: string;
    projects: Array<{
        id: number;
        name: string;
    }>;
}
export declare class CollectionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<CollectionResponse>>;
    findOne(id: number): Promise<CollectionResponse>;
    create(dto: CreateCollectionDto): Promise<CollectionResponse>;
    update(id: number, dto: UpdateCollectionDto): Promise<CollectionResponse>;
    remove(id: number): Promise<void>;
    private assertProjectsExist;
}
