import {
  IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min,
} from 'class-validator';

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

  // IDs of MaterialType records to link (full-replace on update)
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  materialtypeIds?: number[];
}
