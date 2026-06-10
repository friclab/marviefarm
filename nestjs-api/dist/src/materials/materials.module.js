"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsModule = void 0;
const common_1 = require("@nestjs/common");
const suppliers_controller_1 = require("./suppliers/suppliers.controller");
const suppliers_service_1 = require("./suppliers/suppliers.service");
const unit_measurements_controller_1 = require("./unit-measurements/unit-measurements.controller");
const unit_measurements_service_1 = require("./unit-measurements/unit-measurements.service");
const material_types_controller_1 = require("./material-types/material-types.controller");
const material_types_service_1 = require("./material-types/material-types.service");
const materials_controller_1 = require("./materials/materials.controller");
const materials_service_1 = require("./materials/materials.service");
let MaterialsModule = class MaterialsModule {
};
exports.MaterialsModule = MaterialsModule;
exports.MaterialsModule = MaterialsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            suppliers_controller_1.SuppliersController,
            unit_measurements_controller_1.UnitMeasurementsController,
            material_types_controller_1.MaterialTypesController,
            materials_controller_1.MaterialsController,
        ],
        providers: [
            suppliers_service_1.SuppliersService,
            unit_measurements_service_1.UnitMeasurementsService,
            material_types_service_1.MaterialTypesService,
            materials_service_1.MaterialsService,
        ],
        exports: [
            suppliers_service_1.SuppliersService,
            unit_measurements_service_1.UnitMeasurementsService,
            material_types_service_1.MaterialTypesService,
            materials_service_1.MaterialsService,
        ],
    })
], MaterialsModule);
//# sourceMappingURL=materials.module.js.map