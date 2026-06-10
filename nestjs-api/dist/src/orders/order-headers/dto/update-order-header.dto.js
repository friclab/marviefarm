"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderHeaderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_order_header_dto_1 = require("./create-order-header.dto");
class UpdateOrderHeaderDto extends (0, mapped_types_1.PartialType)(create_order_header_dto_1.CreateOrderHeaderDto) {
}
exports.UpdateOrderHeaderDto = UpdateOrderHeaderDto;
//# sourceMappingURL=update-order-header.dto.js.map