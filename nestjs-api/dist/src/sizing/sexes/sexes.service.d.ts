import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateSexDto } from './dto/create-sex.dto';
import { UpdateSexDto } from './dto/update-sex.dto';
export interface SexResponse {
    id: number;
    code: string;
    displayName: string;
}
export declare class SexesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<SexResponse>>;
    findOne(id: number): Promise<SexResponse>;
    create(dto: CreateSexDto): Promise<SexResponse>;
    update(id: number, dto: UpdateSexDto): Promise<SexResponse>;
    remove(id: number): Promise<void>;
}
