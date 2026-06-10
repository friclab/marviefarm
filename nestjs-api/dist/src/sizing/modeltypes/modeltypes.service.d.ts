import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypeDto } from './dto/create-modeltype.dto';
import { UpdateModeltypeDto } from './dto/update-modeltype.dto';
export interface ModeltypeResponse {
    id: number;
    code: string;
    description: string | null;
    displayName: string;
}
export declare class ModeltypesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<ModeltypeResponse>>;
    findOne(id: number): Promise<ModeltypeResponse>;
    create(dto: CreateModeltypeDto): Promise<ModeltypeResponse>;
    update(id: number, dto: UpdateModeltypeDto): Promise<ModeltypeResponse>;
    remove(id: number): Promise<void>;
}
