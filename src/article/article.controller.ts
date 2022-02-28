import { Controller, Get, Post, Body, Param, Delete, HttpCode, Query, Put, NotFoundException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

type Options = {
  skip: number;
  take: number;
}

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query() { skip, take }: Options) {
    return this.articleService.findAll({ skip, take });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const article = await this.articleService.findOne(id);

    if (!article) {
      throw new NotFoundException('Article not found!');
    }

    return article;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
