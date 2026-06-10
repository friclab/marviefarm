import {
  BadRequestException, ConflictException, Injectable, NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { joinDisplay } from '../../common/display-name';
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
    unitmeasurement: { id: number; code: string; description: string | null } | null;
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
    modeltype: { id: number; code: string; description: string | null };
    sex: { id: number; code: string };
  };
  projects: Array<{ id: number; name: string }>;
  fixedComposition: FixedCompositionDetail | null;
}

const includeRelations = {
  modeltypesSex: { include: { modeltype: true, sex: true } },
  projects: { include: { project: true } },
  fixedComposition: {
    include: {
      materials: {
        include: { material: { include: { unitmeasurement: true } } },
        orderBy: { material: { code: 'asc' } } as Prisma.FixedCompositionMaterialOrderByWithRelationInput,
      },
    },
  },
} as const;

type ArticleWithRelations = Prisma.ArticleGetPayload<{ include: typeof includeRelations }>;

function toResponse(row: ArticleWithRelations): ArticleResponse {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    modeltypesSexId: row.modeltypesSexId,
    fixedCompositionId: row.fixedCompositionId,
    displayName: joinDisplay([row.name, row.description]),
    modeltypesSex: {
      id: row.modeltypesSex.id,
      modeltypeId: row.modeltypesSex.modeltypeId,
      sexId: row.modeltypesSex.sexId,
      displayName: joinDisplay([row.modeltypesSex.modeltype.code, row.modeltypesSex.sex.code]),
      modeltype: {
        id: row.modeltypesSex.modeltype.id,
        code: row.modeltypesSex.modeltype.code,
        description: row.modeltypesSex.modeltype.description,
      },
      sex: { id: row.modeltypesSex.sex.id, code: row.modeltypesSex.sex.code },
    },
    projects: row.projects.map(p => ({ id: p.project.id, name: p.project.name })),
    fixedComposition: row.fixedComposition
      ? {
          id: row.fixedComposition.id,
          code: row.fixedComposition.code,
          description: row.fixedComposition.description,
          displayName: joinDisplay([row.fixedComposition.code, row.fixedComposition.description]),
          materials: row.fixedComposition.materials.map(m => ({
            id: m.id,
            materialId: m.materialId,
            quantity: Number(m.quantity),
            material: {
              id: m.material.id,
              code: m.material.code,
              description: m.material.description,
              displayName: m.material.code,
              unitmeasurement: m.material.unitmeasurement
                ? {
                    id: m.material.unitmeasurement.id,
                    code: m.material.unitmeasurement.code,
                    description: m.material.unitmeasurement.description,
                  }
                : null,
            },
          })),
        }
      : null,
  };
}

function isJpeg(buf: Buffer): boolean {
  return buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<ArticleResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.article.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: { name: 'asc' },
      }),
      this.prisma.article.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<ArticleResponse> {
    const row = await this.prisma.article.findUnique({ where: { id }, include: includeRelations });
    if (!row) throw new NotFoundException(`Article ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateArticleDto): Promise<ArticleResponse> {
    const { projectIds, fixedCompositionId, ...fields } = dto;
    await this.assertModeltypesSexExists(fields.modeltypesSexId);
    if (projectIds?.length) await this.assertProjectsExist(projectIds);
    if (fixedCompositionId) await this.assertFixedCompositionExists(fixedCompositionId);

    const row = await this.prisma.article.create({
      data: {
        ...fields,
        fixedCompositionId: fixedCompositionId ?? null,
        projects: {
          create: (projectIds ?? []).map(id => ({ projectId: id })),
        },
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateArticleDto): Promise<ArticleResponse> {
    await this.findOne(id);
    const { projectIds, fixedCompositionId, ...fields } = dto;
    if (fields.modeltypesSexId !== undefined) {
      await this.assertModeltypesSexExists(fields.modeltypesSexId);
    }
    if (projectIds !== undefined && projectIds.length > 0) await this.assertProjectsExist(projectIds);
    if (fixedCompositionId) await this.assertFixedCompositionExists(fixedCompositionId);

    const row = await this.prisma.article.update({
      where: { id },
      data: {
        ...fields,
        ...(fixedCompositionId !== undefined && { fixedCompositionId: fixedCompositionId ?? null }),
        ...(projectIds !== undefined && {
          projects: {
            deleteMany: {},
            create: projectIds.map(pid => ({ projectId: pid })),
          },
        }),
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    const detailCount = await this.prisma.orderDetail.count({ where: { articleId: id } });
    if (detailCount > 0) {
      throw new ConflictException(
        `Cannot delete: ${detailCount} order detail(s) reference this article`,
      );
    }
    await this.prisma.$transaction([
      this.prisma.articleProject.deleteMany({ where: { articleId: id } }),
      this.prisma.fabric.deleteMany({ where: { articleId: id } }),
      this.prisma.article.delete({ where: { id } }),
    ]);
  }

  async updateImage(id: number, buffer: Buffer): Promise<void> {
    await this.findOne(id);
    if (!isJpeg(buffer)) {
      throw new BadRequestException('Only JPEG images are accepted');
    }
    await this.prisma.article.update({ where: { id }, data: { image: buffer } });
  }

  async getImage(id: number): Promise<Buffer> {
    const row = await this.prisma.article.findUnique({
      where: { id },
      select: { image: true },
    });
    if (!row) throw new NotFoundException(`Article ${id} not found`);
    if (!row.image) throw new NotFoundException(`Article ${id} has no image`);
    return Buffer.from(row.image);
  }

  private async assertModeltypesSexExists(id: number): Promise<void> {
    const exists = await this.prisma.modeltypeSex.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`ModeltypeSex ${id} does not exist`);
  }

  private async assertFixedCompositionExists(id: number): Promise<void> {
    const exists = await this.prisma.fixedComposition.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`FixedComposition ${id} does not exist`);
  }

  private async assertProjectsExist(ids: number[]): Promise<void> {
    const found = await this.prisma.project.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });
    if (found.length !== ids.length) {
      const missing = ids.filter(id => !found.some(f => f.id === id));
      throw new BadRequestException(`Project IDs not found: ${missing.join(', ')}`);
    }
  }
}
