import { PartialType } from '@nestjs/mapped-types';
import { CreateModeltypeDto } from './create-modeltype.dto';

export class UpdateModeltypeDto extends PartialType(CreateModeltypeDto) {}
