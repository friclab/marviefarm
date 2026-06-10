import { IsString, MaxLength } from 'class-validator';

export class CreateSexDto {
  @IsString()
  @MaxLength(50)
  code: string = '';
}
