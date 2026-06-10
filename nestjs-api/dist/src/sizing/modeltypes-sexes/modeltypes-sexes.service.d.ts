import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypesSexDto } from './dto/create-modeltypes-sex.dto';
import { UpdateModeltypesSexDto } from './dto/update-modeltypes-sex.dto';
export interface ModeltypesSexResponse {
    id: number;
    modeltypeId: number;
    sexId: number;
    modeltype: {
        id: number;
        code: string;
        description: string | null;
    };
    sex: {
        id: number;
        code: string;
    };
    displayName: string;
}
export declare class ModeltypesSexesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<ModeltypesSexResponse>>;
    findOne(id: number): Promise<ModeltypesSexResponse>;
    create(dto: CreateModeltypesSexDto): Promise<ModeltypesSexResponse>;
    update(id: number, dto: UpdateModeltypesSexDto): Promise<ModeltypesSexResponse>;
    remove(id: number): Promise<void>;
    private assertModeltypeExists;
    private assertSexExists;
}
