import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateFixedCompositionDto {
  @IsString()
  @MinLength(1)
  code!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
