import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateMaterialTypeDto {
  @IsString()
  @MaxLength(50)
  code: string = '';

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  // Marks the type as seasonal so its materials get scoped to a collection.
  @IsOptional()
  @IsBoolean()
  seasonal?: boolean;
}
