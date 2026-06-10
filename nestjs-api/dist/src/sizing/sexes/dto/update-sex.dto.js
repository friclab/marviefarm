"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSexDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sex_dto_1 = require("./create-sex.dto");
class UpdateSexDto extends (0, mapped_types_1.PartialType)(create_sex_dto_1.CreateSexDto) {
}
exports.UpdateSexDto = UpdateSexDto;
//# sourceMappingURL=update-sex.dto.js.map