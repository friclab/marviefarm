"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionsModule = void 0;
const common_1 = require("@nestjs/common");
const fixed_compositions_controller_1 = require("./fixed-compositions/fixed-compositions.controller");
const fixed_compositions_service_1 = require("./fixed-compositions/fixed-compositions.service");
const fixed_composition_materials_controller_1 = require("./fixed-composition-materials/fixed-composition-materials.controller");
const fixed_composition_materials_service_1 = require("./fixed-composition-materials/fixed-composition-materials.service");
const dynamic_compositions_controller_1 = require("./dynamic-compositions/dynamic-compositions.controller");
const dynamic_compositions_service_1 = require("./dynamic-compositions/dynamic-compositions.service");
const dynamic_composition_materials_controller_1 = require("./dynamic-composition-materials/dynamic-composition-materials.controller");
const dynamic_composition_materials_service_1 = require("./dynamic-composition-materials/dynamic-composition-materials.service");
let CompositionsModule = class CompositionsModule {
};
exports.CompositionsModule = CompositionsModule;
exports.CompositionsModule = CompositionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            fixed_compositions_controller_1.FixedCompositionsController,
            fixed_composition_materials_controller_1.FixedCompositionMaterialsController,
            dynamic_compositions_controller_1.DynamicCompositionsController,
            dynamic_composition_materials_controller_1.DynamicCompositionMaterialsController,
        ],
        providers: [
            fixed_compositions_service_1.FixedCompositionsService,
            fixed_composition_materials_service_1.FixedCompositionMaterialsService,
            dynamic_compositions_service_1.DynamicCompositionsService,
            dynamic_composition_materials_service_1.DynamicCompositionMaterialsService,
        ],
        exports: [fixed_compositions_service_1.FixedCompositionsService, dynamic_compositions_service_1.DynamicCompositionsService],
    })
], CompositionsModule);
//# sourceMappingURL=compositions.module.js.map