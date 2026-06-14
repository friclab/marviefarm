import {
  IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min,
} from 'class-validator';
import { MaterialUsage } from '@prisma/client';

export class CreateMaterialDto {
  @IsString()
  @MaxLength(100)
  code: string = '';

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  supplierId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  unitmeasurementId?: number;

  // Season binding; set only for seasonal material types (e.g. fabrics).
  @IsOptional()
  @IsInt()
  @IsPositive()
  collectionId?: number | null;

  // Fixed / dynamic / both — defaults to BOTH at the DB level when omitted
  @IsOptional()
  @IsEnum(MaterialUsage)
  usage?: MaterialUsage;

  // IDs of MaterialType records to link (full-replace on update)
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  materialTypeIds?: number[];
}
