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
  collectionId: number | null;
  collection: { id: number; name: string; displayName: string } | null;
  articles: Array<{ id: number; name: string; displayName: string }>;
}

const includeRelations = {
  collection: true,
  articles: true,
} as const;

type ProjectWithRelations = Prisma.ProjectGetPayload<{ include: typeof includeRelations }>;

// "SS 2027 — name" when labelled, otherwise just the name.
function collectionDisplayName(c: { name: string; type: string | null; year: number | null }): string {
  const season = [c.type, c.year].filter(v => v !== null && v !== undefined).join(' ');
  return season ? `${season} — ${c.name}` : c.name;
}

function toResponse(row: ProjectWithRelations): ProjectResponse {
  return {
    id: row.id,
    name: row.name,
    displayName: row.name,
    collectionId: row.collectionId,
    collection: row.collection
      ? {
          id: row.collection.id,
          name: row.collection.name,
          displayName: collectionDisplayName(row.collection),
        }
      : null,
    articles: row.articles.map(a => ({
      id: a.id,
      name: a.name,
      displayName: a.name,
    })),
  };
}

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page: number,
    limit: number,
    collectionId?: number,
  ): Promise<PaginatedResult<ProjectResponse>> {
    // Direct FK on projects. Absent collectionId => no season filter (show all).
    const where: Prisma.ProjectWhereInput =
      collectionId !== undefined ? { collectionId } : {};
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.project.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: { name: 'asc' },
      }),
      this.prisma.project.count({ where }),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<ProjectResponse> {
    const row = await this.prisma.project.findUnique({ where: { id }, include: includeRelations });
    if (!row) throw new NotFoundException(`Project ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateProjectDto): Promise<ProjectResponse> {
    const { articleIds, collectionId, ...fields } = dto;
    if (articleIds?.length) await this.assertArticlesExist(articleIds);
    if (collectionId) await this.assertCollectionExists(collectionId);

    const row = await this.prisma.project.create({
      data: {
        ...fields,
        collectionId: collectionId ?? null,
        // Articles join via their own FK (article.projectId).
        ...(articleIds?.length && {
          articles: { connect: articleIds.map(aid => ({ id: aid })) },
        }),
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateProjectDto): Promise<ProjectResponse> {
    await this.findOne(id);
    const { articleIds, collectionId, ...fields } = dto;
    if (articleIds !== undefined && articleIds.length > 0) await this.assertArticlesExist(articleIds);
    if (collectionId) await this.assertCollectionExists(collectionId);

    const row = await this.prisma.project.update({
      where: { id },
      data: {
        ...fields,
        ...(collectionId !== undefined && { collectionId: collectionId ?? null }),
        // Full-replace the project's article set via the FK (set = disconnect others).
        ...(articleIds !== undefined && {
          articles: { set: articleIds.map(aid => ({ id: aid })) },
        }),
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    // Member articles keep their rows; their project_id FK is set null on delete
    // (ON DELETE SET NULL).
    await this.prisma.project.delete({ where: { id } });
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

  private async assertCollectionExists(id: number): Promise<void> {
    const exists = await this.prisma.collection.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Collection ${id} does not exist`);
  }
}
