import { IsInt, IsPositive } from 'class-validator';

export class CreateModeltypesSexSizeDto {
  @IsInt()
  @IsPositive()
  modeltypeSexId: number = 0;

  @IsInt()
  @IsPositive()
  sizeId: number = 0;
}
