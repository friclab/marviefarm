import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
export interface SizeResponse {
    id: number;
    code: string;
    displayName: string;
}
export declare class SizesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<SizeResponse>>;
    findOne(id: number): Promise<SizeResponse>;
    create(dto: CreateSizeDto): Promise<SizeResponse>;
    update(id: number, dto: UpdateSizeDto): Promise<SizeResponse>;
    remove(id: number): Promise<void>;
}
