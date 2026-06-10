import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService, ProjectResponse } from './projects.service';
export declare class ProjectsController {
    private readonly service;
    constructor(service: ProjectsService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<ProjectResponse>>;
    findOne(id: number): Promise<ProjectResponse>;
    create(dto: CreateProjectDto): Promise<ProjectResponse>;
    update(id: number, dto: UpdateProjectDto): Promise<ProjectResponse>;
    remove(id: number): Promise<void>;
}
