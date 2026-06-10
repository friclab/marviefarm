import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUnitMeasurementDto {
  @IsString()
  @MaxLength(50)
  code: string = '';

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
