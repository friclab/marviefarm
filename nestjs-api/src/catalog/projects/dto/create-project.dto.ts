import { IsArray, IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  articleIds?: number[];

  // Single season membership (1:N). Null/absent = unassigned.
  @IsOptional()
  @IsInt()
  @IsPositive()
  collectionId?: number | null;
}
