import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateDynamicCompositionMaterialDto {
  @IsInt()
  @IsPositive()
  dynamicCompositionId!: number;

  @IsInt()
  @IsPositive()
  materialId!: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0.001)
  quantity!: number;
}
