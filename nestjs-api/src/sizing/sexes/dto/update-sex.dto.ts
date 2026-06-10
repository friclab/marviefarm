import { PartialType } from '@nestjs/mapped-types';
import { CreateSexDto } from './create-sex.dto';

export class UpdateSexDto extends PartialType(CreateSexDto) {}
