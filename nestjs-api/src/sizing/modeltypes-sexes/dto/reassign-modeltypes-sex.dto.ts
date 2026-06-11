import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsPositive, ValidateNested } from 'class-validator';

export class ReassignArticleDto {
  @IsInt()
  @IsPositive()
  articleId: number = 0;

  @IsInt()
  @IsPositive()
  modeltypeId: number = 0;

  @IsInt()
  @IsPositive()
  sexId: number = 0;
}

export class ReassignModeltypesSexDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ReassignArticleDto)
  assignments: ReassignArticleDto[] = [];
}
