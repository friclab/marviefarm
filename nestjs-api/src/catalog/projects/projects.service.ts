import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

export interface ProjectResponse {
  id: number;
  name: string;
  displayName: string;
  articles: Array<{ id: number; name: string; displayName: string }>;
  collections: Array<{ id: number; name: string }>;
}

const includeRelations = {
  articles: { include: { article: true } },
  collections: { include: { collection: true } },
} as const;

type ProjectWithRelations = Prisma.ProjectGetPayload<{ include: typeof includeRelations }>;

function toResponse(row: ProjectWithRelations): ProjectResponse {
  return {
    id: row.id,
    name: row.name,
    displayName: row.name,
    articles: row.articles.map(a => ({
      id: a.article.id,
      name: a.article.name,
      displayName: a.article.name,
    })),
    collections: row.collections.map(c => ({
      id: c.collection.id,
      name: c.collection.name,
    })),
  };
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<ProjectResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.project.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: { name: 'asc' },
      }),
      this.prisma.project.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<ProjectResponse> {
    const row = await this.prisma.project.findUnique({ where: { id }, include: includeRelations });
    if (!row) throw new NotFoundException(`Project ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateProjectDto): Promise<ProjectResponse> {
    const { articleIds, collectionIds, ...fields } = dto;
    if (articleIds?.length) await this.assertArticlesExist(articleIds);
    if (collectionIds?.length) await this.assertCollectionsExist(collectionIds);

    const row = await this.prisma.project.create({
      data: {
        ...fields,
        articles: {
          create: (articleIds ?? []).map(id => ({ articleId: id })),
        },
        collections: {
          create: (collectionIds ?? []).map(id => ({ collectionId: id })),
        },
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateProjectDto): Promise<ProjectResponse> {
    await this.findOne(id);
    const { articleIds, collectionIds, ...fields } = dto;
    if (articleIds !== undefined && articleIds.length > 0) await this.assertArticlesExist(articleIds);
    if (collectionIds !== undefined && collectionIds.length > 0) {
      await this.assertCollectionsExist(collectionIds);
    }

    const row = await this.prisma.project.update({
      where: { id },
      data: {
        ...fields,
        ...(articleIds !== undefined && {
          articles: {
            deleteMany: {},
            create: articleIds.map(aid => ({ articleId: aid })),
          },
        }),
        ...(collectionIds !== undefined && {
          collections: {
            deleteMany: {},
            create: collectionIds.map(cid => ({ collectionId: cid })),
          },
        }),
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.$transaction([
      this.prisma.articleProject.deleteMany({ where: { projectId: id } }),
      this.prisma.collectionProject.deleteMany({ where: { projectId: id } }),
      this.prisma.project.delete({ where: { id } }),
    ]);
  }

  private async assertArticlesExist(ids: number[]): Promise<void> {
    const found = await this.prisma.article.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });
    if (found.length !== ids.length) {
      const missing = ids.filter(id => !found.some(f => f.id === id));
      throw new BadRequestException(`Article IDs not found: ${missing.join(', ')}`);
    }
  }

  private async assertCollectionsExist(ids: number[]): Promise<void> {
    const found = await this.prisma.collection.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });
    if (found.length !== ids.length) {
      const missing = ids.filter(id => !found.some(f => f.id === id));
      throw new BadRequestException(`Collection IDs not found: ${missing.join(', ')}`);
    }
  }
}
