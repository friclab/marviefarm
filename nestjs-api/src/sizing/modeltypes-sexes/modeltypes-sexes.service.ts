import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { paginate, PaginatedResult } from '../../common/paginated-result';
import { CreateModeltypesSexDto } from './dto/create-modeltypes-sex.dto';
import { UpdateModeltypesSexDto } from './dto/update-modeltypes-sex.dto';
import { ReassignModeltypesSexDto } from './dto/reassign-modeltypes-sex.dto';

export interface ModeltypesSexResponse {
  id: number;
  modeltypeId: number;
  sexId: number;
  modeltype: { id: number; code: string; description: string | null };
  sex: { id: number; code: string; description: string | null };
  displayName: string;
}

export interface ModeltypesSexDependents {
  orderCount: number;
  sizeCount: number;
  articles: { id: number; name: string }[];
  /** No orders and no articles → safe to delete directly. */
  canDelete: boolean;
  /** No orders but articles exist → must reassign articles before deleting. */
  canReassign: boolean;
}

const includeRelations = {
  modeltype: true,
  sex: true,
} as const;

type RowWithRelations = {
  id: number;
  modeltypeId: number;
  sexId: number;
  modeltype: { id: number; code: string; description: string | null };
  sex: { id: number; code: string; description: string | null };
};

function toResponse(row: RowWithRelations): ModeltypesSexResponse {
  const typeName = row.modeltype.description ?? row.modeltype.code;
  const sexName = row.sex.description ?? row.sex.code;
  return {
    ...row,
    displayName: `${typeName} (${sexName})`,
  };
}

@Injectable()
export class ModeltypesSexesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<ModeltypesSexResponse>> {
    const [rows, total] = await this.prisma.$transaction([
      this.prisma.modeltypeSex.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: includeRelations,
        orderBy: [{ modeltype: { code: 'asc' } }, { sex: { code: 'asc' } }],
      }),
      this.prisma.modeltypeSex.count(),
    ]);
    return paginate(rows.map(toResponse), total, page, limit);
  }

  async findOne(id: number): Promise<ModeltypesSexResponse> {
    const row = await this.prisma.modeltypeSex.findUnique({
      where: { id },
      include: includeRelations,
    });
    if (!row) throw new NotFoundException(`ModeltypeSex ${id} not found`);
    return toResponse(row);
  }

  async create(dto: CreateModeltypesSexDto): Promise<ModeltypesSexResponse> {
    await this.assertModeltypeExists(dto.modeltypeId);
    await this.assertSexExists(dto.sexId);
    const row = await this.prisma.modeltypeSex.create({
      data: { modeltypeId: dto.modeltypeId, sexId: dto.sexId },
      include: includeRelations,
    });
    return toResponse(row);
  }

  async update(id: number, dto: UpdateModeltypesSexDto): Promise<ModeltypesSexResponse> {
    await this.findOne(id);
    if (dto.modeltypeId !== undefined) await this.assertModeltypeExists(dto.modeltypeId);
    if (dto.sexId !== undefined) await this.assertSexExists(dto.sexId);
    const row = await this.prisma.modeltypeSex.update({
      where: { id },
      data: dto,
      include: includeRelations,
    });
    return toResponse(row);
  }

  /**
   * Reports what blocks deletion of a combination, so the UI can decide whether to
   * delete directly, refuse (orders present), or open the article-reassignment flow.
   */
  async getDependents(id: number): Promise<ModeltypesSexDependents> {
    await this.findOne(id);
    const [orderCount, sizeCount, articles] = await this.prisma.$transaction([
      this.countLinkedOrdersQuery(id),
      this.prisma.modeltypeSexSize.count({ where: { modeltypeSexId: id } }),
      this.prisma.article.findMany({
        where: { modeltypesSexId: id },
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      }),
    ]);
    return {
      orderCount,
      sizeCount,
      articles,
      canDelete: orderCount === 0 && articles.length === 0,
      canReassign: orderCount === 0 && articles.length > 0,
    };
  }

  /**
   * Moves every article of a combination to a (possibly new) target combination, then
   * deletes the source. Refuses if any order is linked. The caller must supply an
   * assignment for *every* source article — partial reassignment is rejected.
   */
  async reassignArticles(id: number, dto: ReassignModeltypesSexDto): Promise<void> {
    await this.findOne(id);

    const orderCount = await this.countLinkedOrdersQuery(id);
    if (orderCount > 0) {
      throw new ConflictException(
        `Impossibile riassegnare: esistono ${orderCount} riga/e d'ordine collegate a questa combinazione.`,
      );
    }

    // Every source article must be covered exactly, and no foreign article may sneak in.
    const sourceArticles = await this.prisma.article.findMany({
      where: { modeltypesSexId: id },
      select: { id: true },
    });
    const sourceIds = new Set(sourceArticles.map((a) => a.id));
    const assignedIds = new Set(dto.assignments.map((a) => a.articleId));
    for (const a of dto.assignments) {
      if (!sourceIds.has(a.articleId)) {
        throw new BadRequestException(`L'articolo ${a.articleId} non appartiene a questa combinazione.`);
      }
    }
    for (const sid of sourceIds) {
      if (!assignedIds.has(sid)) {
        throw new BadRequestException(
          'Tutti gli articoli devono essere riassegnati prima di eliminare la combinazione.',
        );
      }
    }

    // Validate the distinct target combinations up front for clean error messages.
    const distinctTargets = new Map<string, { modeltypeId: number; sexId: number }>();
    for (const a of dto.assignments) {
      distinctTargets.set(`${a.modeltypeId}_${a.sexId}`, { modeltypeId: a.modeltypeId, sexId: a.sexId });
    }
    for (const t of distinctTargets.values()) {
      await this.assertModeltypeExists(t.modeltypeId);
      await this.assertSexExists(t.sexId);
    }

    await this.prisma.$transaction(async (tx) => {
      // Resolve or activate each distinct target combination.
      const targetIdByKey = new Map<string, number>();
      for (const [key, t] of distinctTargets) {
        const combo = await tx.modeltypeSex.upsert({
          where: { modeltypeId_sexId: { modeltypeId: t.modeltypeId, sexId: t.sexId } },
          create: { modeltypeId: t.modeltypeId, sexId: t.sexId },
          update: {},
        });
        if (combo.id === id) {
          throw new BadRequestException(
            'La combinazione di destinazione non può coincidere con quella da eliminare.',
          );
        }
        targetIdByKey.set(key, combo.id);
      }

      // Repoint every article to its chosen target.
      for (const a of dto.assignments) {
        const targetId = targetIdByKey.get(`${a.modeltypeId}_${a.sexId}`)!;
        await tx.article.update({ where: { id: a.articleId }, data: { modeltypesSexId: targetId } });
      }

      // Source now has no articles; with no orders its sizes can be removed too.
      await tx.modeltypeSexSize.deleteMany({ where: { modeltypeSexId: id } });
      await tx.modeltypeSex.delete({ where: { id } });
    });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    const orderCount = await this.countLinkedOrdersQuery(id);
    if (orderCount > 0) {
      throw new ConflictException(
        `Impossibile eliminare la combinazione: esistono ${orderCount} riga/e d'ordine collegate. Rimuovi prima gli ordini.`,
      );
    }

    const articleCount = await this.prisma.article.count({ where: { modeltypesSexId: id } });
    if (articleCount > 0) {
      throw new ConflictException(
        `Impossibile eliminare la combinazione: ${articleCount} articolo/i sono associati. ` +
          `Riassegnali a un'altra combinazione prima di eliminare.`,
      );
    }

    // No orders, no articles → remove the combination and its (order-free) sizes.
    await this.prisma.$transaction([
      this.prisma.modeltypeSexSize.deleteMany({ where: { modeltypeSexId: id } }),
      this.prisma.modeltypeSex.delete({ where: { id } }),
    ]);
  }

  /** An order touches the combination through an article OR through one of its sizes. */
  private countLinkedOrdersQuery(id: number) {
    return this.prisma.orderDetail.count({
      where: {
        OR: [{ article: { modeltypesSexId: id } }, { modeltypeSexSize: { modeltypeSexId: id } }],
      },
    });
  }

  private async assertModeltypeExists(id: number): Promise<void> {
    const exists = await this.prisma.modeltype.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Modeltype ${id} does not exist`);
  }

  private async assertSexExists(id: number): Promise<void> {
    const exists = await this.prisma.sex.findUnique({ where: { id } });
    if (!exists) throw new BadRequestException(`Sex ${id} does not exist`);
  }
}
