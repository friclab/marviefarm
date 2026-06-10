import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateFabricDto } from './dto/create-fabric.dto';
import { UpdateFabricDto } from './dto/update-fabric.dto';
interface DynamicCompositionMaterialItem {
    id: number;
    materialId: number;
    quantity: number;
    material: {
        id: number;
        code: string;
        description: string | null;
        displayName: string;
        unitmeasurement: {
            id: number;
            code: string;
            description: string | null;
        } | null;
    };
}
interface DynamicCompositionDetail {
    id: number;
    code: string;
    description: string | null;
    displayName: string;
    materials: DynamicCompositionMaterialItem[];
}
export interface FabricResponse {
    id: number;
    code: string;
    description: string | null;
    price: number | null;
    articleId: number;
    dynamicCompositionId: number | null;
    displayName: string;
    article: {
        id: number;
        name: string;
        description: string | null;
        displayName: string;
    };
    dynamicComposition: DynamicCompositionDetail | null;
}
export declare class FabricsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number, articleId?: number): Promise<PaginatedResult<FabricResponse>>;
    findOne(id: number): Promise<FabricResponse>;
    findByArticle(articleId: number): Promise<FabricResponse[]>;
    create(dto: CreateFabricDto): Promise<FabricResponse>;
    update(id: number, dto: UpdateFabricDto): Promise<FabricResponse>;
    remove(id: number): Promise<void>;
    private assertArticleExists;
    private assertDynamicCompositionExists;
}
export {};
