import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateDynamicCompositionMaterialDto } from './dto/create-dynamic-composition-material.dto';
import { UpdateDynamicCompositionMaterialDto } from './dto/update-dynamic-composition-material.dto';
export interface DynamicCompositionMaterialResponse {
    id: number;
    dynamicCompositionId: number;
    materialId: number;
    quantity: number;
    dynamicComposition: {
        id: number;
        code: string;
        description: string | null;
        displayName: string;
    };
    material: {
        id: number;
        code: string;
        description: string | null;
        price: number | null;
        displayName: string;
        unitmeasurement: {
            id: number;
            code: string;
            description: string | null;
        } | null;
    };
}
export declare class DynamicCompositionMaterialsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<DynamicCompositionMaterialResponse>>;
    findOne(id: number): Promise<DynamicCompositionMaterialResponse>;
    create(dto: CreateDynamicCompositionMaterialDto): Promise<DynamicCompositionMaterialResponse>;
    update(id: number, dto: UpdateDynamicCompositionMaterialDto): Promise<DynamicCompositionMaterialResponse>;
    remove(id: number): Promise<void>;
    private assertDynamicCompositionExists;
    private assertMaterialExists;
}
