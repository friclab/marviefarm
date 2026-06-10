import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesService, ArticleResponse } from './articles.service';
export declare class ArticlesController {
    private readonly service;
    constructor(service: ArticlesService);
    findAll(pagination: PaginationDto): Promise<PaginatedResult<ArticleResponse>>;
    findOne(id: number): Promise<ArticleResponse>;
    create(dto: CreateArticleDto): Promise<ArticleResponse>;
    update(id: number, dto: UpdateArticleDto): Promise<ArticleResponse>;
    remove(id: number): Promise<void>;
    getImage(id: number, res: Response): Promise<StreamableFile>;
    uploadImage(id: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
}
