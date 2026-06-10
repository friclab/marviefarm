"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFabricDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_fabric_dto_1 = require("./create-fabric.dto");
class UpdateFabricDto extends (0, mapped_types_1.PartialType)(create_fabric_dto_1.CreateFabricDto) {
}
exports.UpdateFabricDto = UpdateFabricDto;
//# sourceMappingURL=update-fabric.dto.js.map