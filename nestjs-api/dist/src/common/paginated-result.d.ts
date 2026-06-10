export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}
export declare function paginate<T>(data: T[], total: number, page: number, limit: number): PaginatedResult<T>;
