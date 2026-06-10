import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers/suppliers.controller';
import { SuppliersService } from './suppliers/suppliers.service';
import { UnitMeasurementsController } from './unit-measurements/unit-measurements.controller';
import { UnitMeasurementsService } from './unit-measurements/unit-measurements.service';
import { MaterialTypesController } from './material-types/material-types.controller';
import { MaterialTypesService } from './material-types/material-types.service';
import { MaterialsController } from './materials/materials.controller';
import { MaterialsService } from './materials/materials.service';

@Module({
  controllers: [
    SuppliersController,
    UnitMeasurementsController,
    MaterialTypesController,
    MaterialsController,
  ],
  providers: [
    SuppliersService,
    UnitMeasurementsService,
    MaterialTypesService,
    MaterialsService,
  ],
  exports: [
    SuppliersService,
    UnitMeasurementsService,
    MaterialTypesService,
    MaterialsService,
  ],
})
export class MaterialsModule {}
