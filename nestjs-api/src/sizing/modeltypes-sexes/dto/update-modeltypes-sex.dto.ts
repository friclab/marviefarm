import { PartialType } from '@nestjs/mapped-types';
import { CreateModeltypesSexDto } from './create-modeltypes-sex.dto';

export class UpdateModeltypesSexDto extends PartialType(CreateModeltypesSexDto) {}
