import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query,
} from '@nestjs/common';
import { ScopedPaginationDto } from '../../common/scoped-pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService, ProjectResponse } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  findAll(@Query() query: ScopedPaginationDto): Promise<PaginatedResult<ProjectResponse>> {
    return this.service.findAll(query.page, query.limit, query.collectionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProjectDto): Promise<ProjectResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
  ): Promise<ProjectResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
