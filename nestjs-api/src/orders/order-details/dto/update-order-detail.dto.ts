import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateOrderDetailDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  articleId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  fabricId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  modeltypeSexSizeId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsString()
  note?: string;
}
