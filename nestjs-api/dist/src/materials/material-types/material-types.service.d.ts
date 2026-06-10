import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateMaterialTypeDto } from './dto/create-material-type.dto';
import { UpdateMaterialTypeDto } from './dto/update-material-type.dto';
export interface MaterialTypeResponse {
    id: number;
    code: string;
    description: string | null;
    displayName: string;
}
export declare class MaterialTypesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<MaterialTypeResponse>>;
    findOne(id: number): Promise<MaterialTypeResponse>;
    create(dto: CreateMaterialTypeDto): Promise<MaterialTypeResponse>;
    update(id: number, dto: UpdateMaterialTypeDto): Promise<MaterialTypeResponse>;
    remove(id: number): Promise<void>;
}
