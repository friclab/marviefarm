import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

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

  // Single season membership (1:N). Null/absent = unassigned.
  @IsOptional()
  @IsInt()
  @IsPositive()
  projectId?: number | null;
}
