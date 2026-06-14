import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

// Query DTOs for the report endpoints. Using class-validator (like the rest of the
// API) instead of inline ParseIntPipe avoids the optional-param edge case where an
// absent numeric query rejects with 400. collectionId is the optional season scope;
// absent => no scope (all seasons), matching the previous behaviour.

export class CostCalculationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  multiplier: number = 1;

  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true' || value === '1')
  @IsBoolean()
  detailed: boolean = false;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  collectionId?: number;
}

export class CostPreviewQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  multiplier: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  collectionId?: number;
}

export class MaterialConsumptionQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  orderId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  collectionId?: number;
}
