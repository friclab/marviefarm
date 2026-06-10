"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUnitMeasurementDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_unit_measurement_dto_1 = require("./create-unit-measurement.dto");
class UpdateUnitMeasurementDto extends (0, mapped_types_1.PartialType)(create_unit_measurement_dto_1.CreateUnitMeasurementDto) {
}
exports.UpdateUnitMeasurementDto = UpdateUnitMeasurementDto;
//# sourceMappingURL=update-unit-measurement.dto.js.map