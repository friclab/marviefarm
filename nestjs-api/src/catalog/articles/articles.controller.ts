import {
  BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Patch, Post, Query, Res, StreamableFile, UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import { ScopedPaginationDto } from '../../common/scoped-pagination.dto';
import { PaginatedResult } from '../../common/paginated-result';
import { Public } from '../../auth/public.decorator';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesService, ArticleResponse } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Get()
  findAll(@Query() query: ScopedPaginationDto): Promise<PaginatedResult<ArticleResponse>> {
    return this.service.findAll(query.page, query.limit, query.collectionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ArticleResponse> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateArticleDto): Promise<ArticleResponse> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto,
  ): Promise<ArticleResponse> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }

  // Original: ArticlesController::show() — publicly accessible (Auth->allow('show'))
  @Get(':id/image')
  @Public()
  async getImage(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const buffer = await this.service.getImage(id);
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `inline; filename="article_${id}.jpg"`);
    return new StreamableFile(buffer);
  }

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string }> {
    if (!file) throw new BadRequestException('No image file uploaded (field name: image)');
    await this.service.updateImage(id, file.buffer);
    return { message: 'Image updated successfully' };
  }
}
