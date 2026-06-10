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
exports.FixedCompositionsController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../../common/pagination.dto");
const create_fixed_composition_dto_1 = require("./dto/create-fixed-composition.dto");
const update_fixed_composition_dto_1 = require("./dto/update-fixed-composition.dto");
const fixed_compositions_service_1 = require("./fixed-compositions.service");
let FixedCompositionsController = class FixedCompositionsController {
    constructor(service) {
        this.service = service;
    }
    findAll(pagination) {
        return this.service.findAll(pagination.page, pagination.limit);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    create(dto) {
        return this.service.create(dto);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.FixedCompositionsController = FixedCompositionsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], FixedCompositionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FixedCompositionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fixed_composition_dto_1.CreateFixedCompositionDto]),
    __metadata("design:returntype", Promise)
], FixedCompositionsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_fixed_composition_dto_1.UpdateFixedCompositionDto]),
    __metadata("design:returntype", Promise)
], FixedCompositionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FixedCompositionsController.prototype, "remove", null);
exports.FixedCompositionsController = FixedCompositionsController = __decorate([
    (0, common_1.Controller)('fixed-compositions'),
    __metadata("design:paramtypes", [fixed_compositions_service_1.FixedCompositionsService])
], FixedCompositionsController);
//# sourceMappingURL=fixed-compositions.controller.js.map