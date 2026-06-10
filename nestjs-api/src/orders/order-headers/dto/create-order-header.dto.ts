import { Type } from 'class-transformer';
import {
  IsDateString, IsInt, IsNumber, IsOptional, IsPositive, IsString, Max, Min,
} from 'class-validator';

export class CreateOrderHeaderDto {
  @IsInt()
  @IsPositive()
  customerId!: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  collectionId?: number;

  @IsOptional()
  @IsString()
  orderNumber?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  discount?: number;

  @IsOptional()
  @IsString()
  payment?: string;

  @IsOptional()
  @IsString()
  note?: string;
}
