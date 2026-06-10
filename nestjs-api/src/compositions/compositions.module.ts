import { Module } from '@nestjs/common';
import { FixedCompositionsController } from './fixed-compositions/fixed-compositions.controller';
import { FixedCompositionsService } from './fixed-compositions/fixed-compositions.service';
import { FixedCompositionMaterialsController } from './fixed-composition-materials/fixed-composition-materials.controller';
import { FixedCompositionMaterialsService } from './fixed-composition-materials/fixed-composition-materials.service';
import { DynamicCompositionsController } from './dynamic-compositions/dynamic-compositions.controller';
import { DynamicCompositionsService } from './dynamic-compositions/dynamic-compositions.service';
import { DynamicCompositionMaterialsController } from './dynamic-composition-materials/dynamic-composition-materials.controller';
import { DynamicCompositionMaterialsService } from './dynamic-composition-materials/dynamic-composition-materials.service';

@Module({
  controllers: [
    FixedCompositionsController,
    FixedCompositionMaterialsController,
    DynamicCompositionsController,
    DynamicCompositionMaterialsController,
  ],
  providers: [
    FixedCompositionsService,
    FixedCompositionMaterialsService,
    DynamicCompositionsService,
    DynamicCompositionMaterialsService,
  ],
  exports: [FixedCompositionsService, DynamicCompositionsService],
})
export class CompositionsModule {}
