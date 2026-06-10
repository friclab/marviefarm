import { PartialType } from '@nestjs/mapped-types';
import { CreateDynamicCompositionDto } from './create-dynamic-composition.dto';

export class UpdateDynamicCompositionDto extends PartialType(CreateDynamicCompositionDto) {}
