import { Type } from 'class-transformer';
import {
  IsArray, IsInt, IsOptional, IsPositive, IsString, Min, ValidateNested,
} from 'class-validator';

class BatchItemDto {
  @IsInt()
  @IsPositive()
  modeltypeSexSizeId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class BatchCreateOrderDetailDto {
  @IsInt()
  @IsPositive()
  orderHeaderId!: number;

  @IsInt()
  @IsPositive()
  articleId!: number;

  @IsInt()
  @IsPositive()
  fabricId!: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BatchItemDto)
  items!: BatchItemDto[];
}
