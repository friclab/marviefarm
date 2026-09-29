import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { PaginationDto } from './pagination.dto';

// Pagination plus an optional season scope. `collectionId` is a view-scoping
// filter (not an authorization boundary): when omitted, no season filter is
// applied and all rows are returned (legacy behaviour).
export class ScopedPaginationDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  collectionId?: number;
}
