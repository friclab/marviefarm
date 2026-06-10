import { Module } from '@nestjs/common';
import { SexesController } from './sexes/sexes.controller';
import { SexesService } from './sexes/sexes.service';
import { ModeltypesController } from './modeltypes/modeltypes.controller';
import { ModeltypesService } from './modeltypes/modeltypes.service';
import { ModeltypesSexesController } from './modeltypes-sexes/modeltypes-sexes.controller';
import { ModeltypesSexesService } from './modeltypes-sexes/modeltypes-sexes.service';
import { SizesController } from './sizes/sizes.controller';
import { SizesService } from './sizes/sizes.service';
import { ModeltypesSexSizesController } from './modeltypes-sex-sizes/modeltypes-sex-sizes.controller';
import { ModeltypesSexSizesService } from './modeltypes-sex-sizes/modeltypes-sex-sizes.service';

@Module({
  controllers: [
    SexesController,
    ModeltypesController,
    ModeltypesSexesController,
    SizesController,
    ModeltypesSexSizesController,
  ],
  providers: [
    SexesService,
    ModeltypesService,
    ModeltypesSexesService,
    SizesService,
    ModeltypesSexSizesService,
  ],
  exports: [
    SexesService,
    ModeltypesService,
    ModeltypesSexesService,
    SizesService,
    ModeltypesSexSizesService,
  ],
})
export class SizingModule {}
