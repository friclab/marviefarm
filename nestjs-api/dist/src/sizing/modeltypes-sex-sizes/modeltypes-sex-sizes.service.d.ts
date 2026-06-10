import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypesSexSizeDto } from './dto/create-modeltypes-sex-size.dto';
import { UpdateModeltypesSexSizeDto } from './dto/update-modeltypes-sex-size.dto';
export interface ModeltypesSexSizeResponse {
    id: number;
    modeltypeSexId: number;
    sizeId: number;
    modeltypeSex: {
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
    };
    size: {
        id: number;
        code: string;
    };
    displayName: string;
}
export declare class ModeltypesSexSizesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<ModeltypesSexSizeResponse>>;
    findOne(id: number): Promise<ModeltypesSexSizeResponse>;
    create(dto: CreateModeltypesSexSizeDto): Promise<ModeltypesSexSizeResponse>;
    update(id: number, dto: UpdateModeltypesSexSizeDto): Promise<ModeltypesSexSizeResponse>;
    remove(id: number): Promise<void>;
    private assertModeltypesSexExists;
    private assertSizeExists;
}
