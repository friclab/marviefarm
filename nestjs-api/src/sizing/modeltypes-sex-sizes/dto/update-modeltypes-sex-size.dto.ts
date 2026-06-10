import { PartialType } from '@nestjs/mapped-types';
import { CreateModeltypesSexSizeDto } from './create-modeltypes-sex-size.dto';

export class UpdateModeltypesSexSizeDto extends PartialType(CreateModeltypesSexSizeDto) {}
