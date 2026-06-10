import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateFixedCompositionMaterialDto } from './dto/create-fixed-composition-material.dto';
import { UpdateFixedCompositionMaterialDto } from './dto/update-fixed-composition-material.dto';
export interface FixedCompositionMaterialResponse {
    id: number;
    fixedCompositionId: number;
    materialId: number;
    quantity: number;
    fixedComposition: {
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
export declare class FixedCompositionMaterialsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<FixedCompositionMaterialResponse>>;
    findOne(id: number): Promise<FixedCompositionMaterialResponse>;
    create(dto: CreateFixedCompositionMaterialDto): Promise<FixedCompositionMaterialResponse>;
    update(id: number, dto: UpdateFixedCompositionMaterialDto): Promise<FixedCompositionMaterialResponse>;
    remove(id: number): Promise<void>;
    private assertFixedCompositionExists;
    private assertMaterialExists;
}
