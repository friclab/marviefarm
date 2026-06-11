import { Type } from 'class-transformer';
import {
  ArrayMinSize, IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString,
  MinLength, ValidateNested,
} from 'class-validator';

class BatchVariantMaterialDto {
  @IsInt()
  @IsPositive()
  materialId!: number;

  // Mirrors DynamicCompositionMaterial.quantity — Decimal(10,3).
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 3 })
  @IsPositive()
  quantity!: number;
}

class BatchVariantDto {
  @IsString()
  @MinLength(1)
  code!: string;

  @IsOptional()
  @IsString()
  description?: string;

  // This variant's own dynamic composition — typically the single distinguishing
  // fabric (a DYNAMIC material), but any number of lines is accepted.
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BatchVariantMaterialDto)
  materials?: BatchVariantMaterialDto[];
}

export class BatchCreateFabricDto {
  @IsInt()
  @IsPositive()
  articleId!: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => BatchVariantDto)
  variants!: BatchVariantDto[];
}
