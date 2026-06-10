"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizingModule = void 0;
const common_1 = require("@nestjs/common");
const sexes_controller_1 = require("./sexes/sexes.controller");
const sexes_service_1 = require("./sexes/sexes.service");
const modeltypes_controller_1 = require("./modeltypes/modeltypes.controller");
const modeltypes_service_1 = require("./modeltypes/modeltypes.service");
const modeltypes_sexes_controller_1 = require("./modeltypes-sexes/modeltypes-sexes.controller");
const modeltypes_sexes_service_1 = require("./modeltypes-sexes/modeltypes-sexes.service");
const sizes_controller_1 = require("./sizes/sizes.controller");
const sizes_service_1 = require("./sizes/sizes.service");
const modeltypes_sex_sizes_controller_1 = require("./modeltypes-sex-sizes/modeltypes-sex-sizes.controller");
const modeltypes_sex_sizes_service_1 = require("./modeltypes-sex-sizes/modeltypes-sex-sizes.service");
let SizingModule = class SizingModule {
};
exports.SizingModule = SizingModule;
exports.SizingModule = SizingModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            sexes_controller_1.SexesController,
            modeltypes_controller_1.ModeltypesController,
            modeltypes_sexes_controller_1.ModeltypesSexesController,
            sizes_controller_1.SizesController,
            modeltypes_sex_sizes_controller_1.ModeltypesSexSizesController,
        ],
        providers: [
            sexes_service_1.SexesService,
            modeltypes_service_1.ModeltypesService,
            modeltypes_sexes_service_1.ModeltypesSexesService,
            sizes_service_1.SizesService,
            modeltypes_sex_sizes_service_1.ModeltypesSexSizesService,
        ],
        exports: [
            sexes_service_1.SexesService,
            modeltypes_service_1.ModeltypesService,
            modeltypes_sexes_service_1.ModeltypesSexesService,
            sizes_service_1.SizesService,
            modeltypes_sex_sizes_service_1.ModeltypesSexSizesService,
        ],
    })
], SizingModule);
//# sourceMappingURL=sizing.module.js.map