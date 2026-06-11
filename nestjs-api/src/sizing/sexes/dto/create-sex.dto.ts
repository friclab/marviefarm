import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSexDto {
  @IsString()
  @MaxLength(10)
  code: string = '';

  @IsOptional()
  @IsString()
  @MaxLength(100)
  description?: string;
}
