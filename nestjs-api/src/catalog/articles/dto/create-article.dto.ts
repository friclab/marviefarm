import { IsArray, IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @IsPositive()
  modeltypesSexId!: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  fixedCompositionId?: number | null;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  projectIds?: number[];
}
