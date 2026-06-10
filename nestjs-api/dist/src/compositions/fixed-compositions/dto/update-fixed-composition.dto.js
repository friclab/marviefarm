"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFixedCompositionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_fixed_composition_dto_1 = require("./create-fixed-composition.dto");
class UpdateFixedCompositionDto extends (0, mapped_types_1.PartialType)(create_fixed_composition_dto_1.CreateFixedCompositionDto) {
}
exports.UpdateFixedCompositionDto = UpdateFixedCompositionDto;
//# sourceMappingURL=update-fixed-composition.dto.js.map