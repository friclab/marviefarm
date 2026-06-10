import { PartialType } from '@nestjs/mapped-types';
import { CreateFixedCompositionDto } from './create-fixed-composition.dto';

export class UpdateFixedCompositionDto extends PartialType(CreateFixedCompositionDto) {}
