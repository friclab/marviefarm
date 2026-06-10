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
exports.OrderDetailsController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../../common/pagination.dto");
const create_order_detail_dto_1 = require("./dto/create-order-detail.dto");
const batch_create_order_detail_dto_1 = require("./dto/batch-create-order-detail.dto");
const order_details_service_1 = require("./order-details.service");
let OrderDetailsController = class OrderDetailsController {
    constructor(service) {
        this.service = service;
    }
    getFabricOptions(articleId) {
        return this.service.getFabricOptions(articleId);
    }
    getSizeOptions(articleId) {
        return this.service.getSizeOptions(articleId);
    }
    getArticleInfo(articleId) {
        return this.service.getArticleInfo(articleId);
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
    batchCreate(dto) {
        return this.service.batchCreate(dto);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.OrderDetailsController = OrderDetailsController;
__decorate([
    (0, common_1.Get)('fabric-options'),
    __param(0, (0, common_1.Query)('articleId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderDetailsController.prototype, "getFabricOptions", null);
__decorate([
    (0, common_1.Get)('size-options'),
    __param(0, (0, common_1.Query)('articleId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderDetailsController.prototype, "getSizeOptions", null);
__decorate([
    (0, common_1.Get)('article-info'),
    __param(0, (0, common_1.Query)('articleId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderDetailsController.prototype, "getArticleInfo", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], OrderDetailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderDetailsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_detail_dto_1.CreateOrderDetailDto]),
    __metadata("design:returntype", Promise)
], OrderDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('batch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [batch_create_order_detail_dto_1.BatchCreateOrderDetailDto]),
    __metadata("design:returntype", Promise)
], OrderDetailsController.prototype, "batchCreate", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, order_details_service_1.UpdateOrderDetailDto]),
    __metadata("design:returntype", Promise)
], OrderDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderDetailsController.prototype, "remove", null);
exports.OrderDetailsController = OrderDetailsController = __decorate([
    (0, common_1.Controller)('order-details'),
    __metadata("design:paramtypes", [order_details_service_1.OrderDetailsService])
], OrderDetailsController);
//# sourceMappingURL=order-details.controller.js.map