import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

export interface CollectionResponse {
  id: number;
  name: string;
  type: string | null;
  year: number | null;
  displayName: string;
  projects: Array<{ id: number; name: string }>;
}

const includeRelations = {
  projects: true,
} as const;

type CollectionWithRelations = Prisma.CollectionGetPayload<{ include: typeof includeRelations }>;

// "SS 2027 — Summer drop" when labelled, otherwise just the name.
function collectionDisplayName(row: { name: string; type: string | null; year: number | null }): string {
  const season = [row.type, row.year].filter(v => v !== null && v !== undefined).join(' ');
  return season ? `${season} — ${row.name}` : row.name;
}

function toResponse(row: CollectionWithRelations): CollectionResponse {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    year: row.year,
    displayName: collectionDisplayName(row),
    projects: row.projects.map(p => ({ id: p.id, name: p.name })),
  };
}

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<CollectionResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.collection.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: { name: 'asc' },
      }),
      this.prisma.collection.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<CollectionResponse> {
    const row = await this.prisma.collection.findUnique({ where: { id }, include: includeRelations });
    if (!row) throw new NotFoundException(`Collection ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateCollectionDto): Promise<CollectionResponse> {
    const { projectIds, ...fields } = dto;
    if (projectIds?.length) await this.assertProjectsExist(projectIds);

    const row = await this.prisma.collection.create({
      data: {
        ...fields,
        // Projects join via their own FK (project.collectionId).
        ...(projectIds?.length && {
          projects: { connect: projectIds.map(id => ({ id })) },
        }),
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateCollectionDto): Promise<CollectionResponse> {
    await this.findOne(id);
    const { projectIds, ...fields } = dto;
    if (projectIds !== undefined && projectIds.length > 0) await this.assertProjectsExist(projectIds);

    const row = await this.prisma.collection.update({
      where: { id },
      data: {
        ...fields,
        // Full-replace the collection's project set via the FK (set = disconnect others).
        ...(projectIds !== undefined && {
          projects: { set: projectIds.map(id => ({ id })) },
        }),
      },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    const orderCount = await this.prisma.orderHeader.count({ where: { collectionId: id } });
    if (orderCount > 0) {
      throw new ConflictException(
        `Cannot delete: ${orderCount} order(s) reference this collection`,
      );
    }
    // Member projects/materials keep their rows; their collection_id FK is set
    // null on delete (ON DELETE SET NULL).
    await this.prisma.collection.delete({ where: { id } });
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
