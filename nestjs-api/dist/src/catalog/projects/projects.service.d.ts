import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export interface ProjectResponse {
    id: number;
    name: string;
    displayName: string;
    articles: Array<{
        id: number;
        name: string;
        displayName: string;
    }>;
    collections: Array<{
        id: number;
        name: string;
    }>;
}
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(page: number, limit: number): Promise<PaginatedResult<ProjectResponse>>;
    findOne(id: number): Promise<ProjectResponse>;
    create(dto: CreateProjectDto): Promise<ProjectResponse>;
    update(id: number, dto: UpdateProjectDto): Promise<ProjectResponse>;
    remove(id: number): Promise<void>;
    private assertArticlesExist;
    private assertCollectionsExist;
}
