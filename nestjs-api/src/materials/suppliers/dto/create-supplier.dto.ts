import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSupplierDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  company?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  surname?: string;
}
