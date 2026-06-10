import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateFixedCompositionDto } from './dto/create-fixed-composition.dto';
import { UpdateFixedCompositionDto } from './dto/update-fixed-composition.dto';
export interface FixedCompositionMaterialItem {
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
export interface FixedCompositionResponse {
    id: number;
    code: string;
    description: string | null;
    displayName: string;
    materials: FixedCompositionMaterialItem[];
}
export declare class FixedCompositionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<FixedCompositionResponse>>;
    findOne(id: number): Promise<FixedCompositionResponse>;
    create(dto: CreateFixedCompositionDto): Promise<FixedCompositionResponse>;
    update(id: number, dto: UpdateFixedCompositionDto): Promise<FixedCompositionResponse>;
    remove(id: number): Promise<void>;
}
