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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SexesController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../../common/pagination.dto");
const create_sex_dto_1 = require("./dto/create-sex.dto");
const update_sex_dto_1 = require("./dto/update-sex.dto");
const sexes_service_1 = require("./sexes.service");
let SexesController = class SexesController {
    constructor(sexesService) {
        this.sexesService = sexesService;
    }
    findAll(pagination) {
        return this.sexesService.findAll(pagination.page, pagination.limit);
    }
    findOne(id) {
        return this.sexesService.findOne(id);
    }
    create(dto) {
        return this.sexesService.create(dto);
    }
    update(id, dto) {
        return this.sexesService.update(id, dto);
    }
    remove(id) {
        return this.sexesService.remove(id);
    }
};
exports.SexesController = SexesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], SexesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SexesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sex_dto_1.CreateSexDto]),
    __metadata("design:returntype", Promise)
], SexesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_sex_dto_1.UpdateSexDto]),
    __metadata("design:returntype", Promise)
], SexesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SexesController.prototype, "remove", null);
exports.SexesController = SexesController = __decorate([
    (0, common_1.Controller)('sexes'),
    __metadata("design:paramtypes", [sexes_service_1.SexesService])
], SexesController);
//# sourceMappingURL=sexes.controller.js.map