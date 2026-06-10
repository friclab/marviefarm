import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
interface CompositionMaterialItem {
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
interface FixedCompositionDetail {
    id: number;
    code: string;
    description: string | null;
    displayName: string;
    materials: CompositionMaterialItem[];
}
export interface ArticleResponse {
    id: number;
    name: string;
    description: string | null;
    modeltypesSexId: number;
    fixedCompositionId: number | null;
    displayName: string;
    modeltypesSex: {
        id: number;
        modeltypeId: number;
        sexId: number;
        displayName: string;
        modeltype: {
            id: number;
            code: string;
            description: string | null;
        };
        sex: {
            id: number;
            code: string;
        };
    };
    projects: Array<{
        id: number;
        name: string;
    }>;
    fixedComposition: FixedCompositionDetail | null;
}
export declare class ArticlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<ArticleResponse>>;
    findOne(id: number): Promise<ArticleResponse>;
    create(dto: CreateArticleDto): Promise<ArticleResponse>;
    update(id: number, dto: UpdateArticleDto): Promise<ArticleResponse>;
    remove(id: number): Promise<void>;
    updateImage(id: number, buffer: Buffer): Promise<void>;
    getImage(id: number): Promise<Buffer>;
    private assertModeltypesSexExists;
    private assertFixedCompositionExists;
    private assertProjectsExist;
}
export {};
