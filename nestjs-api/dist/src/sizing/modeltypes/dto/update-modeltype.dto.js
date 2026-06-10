"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateModeltypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_modeltype_dto_1 = require("./create-modeltype.dto");
class UpdateModeltypeDto extends (0, mapped_types_1.PartialType)(create_modeltype_dto_1.CreateModeltypeDto) {
}
exports.UpdateModeltypeDto = UpdateModeltypeDto;
//# sourceMappingURL=update-modeltype.dto.js.map