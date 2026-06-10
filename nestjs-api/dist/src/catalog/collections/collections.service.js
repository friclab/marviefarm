"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginated_result_1 = require("../../common/paginated-result");
const includeRelations = {
    projects: { include: { project: true } },
};
function toResponse(row) {
    return {
        id: row.id,
        name: row.name,
        displayName: row.name,
        projects: row.projects.map(p => ({ id: p.project.id, name: p.project.name })),
    };
}
let CollectionsService = class CollectionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(page, limit) {
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.collection.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: includeRelations,
                orderBy: { name: 'asc' },
            }),
            this.prisma.collection.count(),
        ]);
        return (0, paginated_result_1.paginate)(rows.map(toResponse), total, page, limit);
    }
    async findOne(id) {
        const row = await this.prisma.collection.findUnique({ where: { id }, include: includeRelations });
        if (!row)
            throw new common_1.NotFoundException(`Collection ${id} not found`);
        return toResponse(row);
    }
    async create(dto) {
        const { projectIds, ...fields } = dto;
        if (projectIds?.length)
            await this.assertProjectsExist(projectIds);
        const row = await this.prisma.collection.create({
            data: {
                ...fields,
                projects: {
                    create: (projectIds ?? []).map(id => ({ projectId: id })),
                },
            },
            include: includeRelations,
        });
        return toResponse(row);
    }
    async update(id, dto) {
        await this.findOne(id);
        const { projectIds, ...fields } = dto;
        if (projectIds !== undefined && projectIds.length > 0)
            await this.assertProjectsExist(projectIds);
        const row = await this.prisma.collection.update({
            where: { id },
            data: {
                ...fields,
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
    async remove(id) {
        await this.findOne(id);
        const orderCount = await this.prisma.orderHeader.count({ where: { collectionId: id } });
        if (orderCount > 0) {
            throw new common_1.ConflictException(`Cannot delete: ${orderCount} order(s) reference this collection`);
        }
        await this.prisma.$transaction([
            this.prisma.collectionProject.deleteMany({ where: { collectionId: id } }),
            this.prisma.collection.delete({ where: { id } }),
        ]);
    }
    async assertProjectsExist(ids) {
        const found = await this.prisma.project.findMany({
            where: { id: { in: ids } },
            select: { id: true },
        });
        if (found.length !== ids.length) {
            const missing = ids.filter(id => !found.some(f => f.id === id));
            throw new common_1.BadRequestException(`Project IDs not found: ${missing.join(', ')}`);
        }
    }
};
exports.CollectionsService = CollectionsService;
exports.CollectionsService = CollectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CollectionsService);
//# sourceMappingURL=collections.service.js.map