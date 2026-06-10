"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const order_headers_controller_1 = require("./order-headers/order-headers.controller");
const order_headers_service_1 = require("./order-headers/order-headers.service");
const order_details_controller_1 = require("./order-details/order-details.controller");
const order_details_service_1 = require("./order-details/order-details.service");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        controllers: [order_headers_controller_1.OrderHeadersController, order_details_controller_1.OrderDetailsController],
        providers: [order_headers_service_1.OrderHeadersService, order_details_service_1.OrderDetailsService],
        exports: [order_headers_service_1.OrderHeadersService],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map