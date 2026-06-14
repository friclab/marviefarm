import { IsArray, IsIn, IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @MinLength(1)
  name!: string;

  // Season label, used for ordering and auto-selecting the latest season.
  @IsOptional()
  @IsIn(['SS', 'FW'])
  type?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  year?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  projectIds?: number[];
}
