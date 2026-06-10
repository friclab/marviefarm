import { IsInt, IsPositive } from 'class-validator';

export class CreateModeltypesSexDto {
  @IsInt()
  @IsPositive()
  modeltypeId: number = 0;

  @IsInt()
  @IsPositive()
  sexId: number = 0;
}
