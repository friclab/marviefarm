import { IsString, MaxLength } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @MaxLength(50)
  code: string = '';
}
