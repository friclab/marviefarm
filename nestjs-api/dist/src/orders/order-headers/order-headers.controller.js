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
exports.OrderHeadersController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../../common/pagination.dto");
const create_order_header_dto_1 = require("./dto/create-order-header.dto");
const update_order_header_dto_1 = require("./dto/update-order-header.dto");
const order_headers_service_1 = require("./order-headers.service");
let OrderHeadersController = class OrderHeadersController {
    constructor(service) {
        this.service = service;
    }
    getNextNumber() {
        return this.service.getNextId();
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
exports.OrderHeadersController = OrderHeadersController;
__decorate([
    (0, common_1.Get)('next-number'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderHeadersController.prototype, "getNextNumber", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], OrderHeadersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderHeadersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_header_dto_1.CreateOrderHeaderDto]),
    __metadata("design:returntype", Promise)
], OrderHeadersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_header_dto_1.UpdateOrderHeaderDto]),
    __metadata("design:returntype", Promise)
], OrderHeadersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderHeadersController.prototype, "remove", null);
exports.OrderHeadersController = OrderHeadersController = __decorate([
    (0, common_1.Controller)('order-headers'),
    __metadata("design:paramtypes", [order_headers_service_1.OrderHeadersService])
], OrderHeadersController);
//# sourceMappingURL=order-headers.controller.js.map