import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Query,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

type Options = {
  skip: number;
  take: number;
};

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query() { skip, take }: Options) {
    return this.articleService.findAll({ skip, take });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const article = await this.articleService.findOne(Number(id));

    if (!article) {
      throw new NotFoundException('Article not found!');
    }

    return article;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.articleService.update(
      Number(id),
      updateArticleDto,
    );

    if (!article) {
      throw new NotFoundException('Article not found!');
    }

    return article;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articleService.remove(Number(id));
  }
}
