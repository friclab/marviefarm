import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDynamicCompositionDto {
  @IsString()
  @MinLength(1)
  code!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
