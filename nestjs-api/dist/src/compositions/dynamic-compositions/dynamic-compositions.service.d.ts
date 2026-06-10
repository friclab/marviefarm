import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateDynamicCompositionDto } from './dto/create-dynamic-composition.dto';
import { UpdateDynamicCompositionDto } from './dto/update-dynamic-composition.dto';
export interface DynamicCompositionMaterialItem {
    id: number;
    materialId: number;
    quantity: number;
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
export interface DynamicCompositionResponse {
    id: number;
    code: string;
    description: string | null;
    displayName: string;
    materials: DynamicCompositionMaterialItem[];
}
export declare class DynamicCompositionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<DynamicCompositionResponse>>;
    findOne(id: number): Promise<DynamicCompositionResponse>;
    create(dto: CreateDynamicCompositionDto): Promise<DynamicCompositionResponse>;
    update(id: number, dto: UpdateDynamicCompositionDto): Promise<DynamicCompositionResponse>;
    remove(id: number): Promise<void>;
}
