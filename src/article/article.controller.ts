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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '@prisma/client';

type Options = {
  skip: number;
  take: number;
};

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({
    type: [CreateArticleDto],
  })
  @ApiCreatedResponse({
    description: 'Create a new article in the database',
  })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Return a list of articles',
  })
  async findAll(@Query() { skip, take }: Options) {
    return this.articleService.findAll({ skip, take });
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Return a single article',
  })
  @ApiNotFoundResponse({
    description:
      'Return not found when the article with the provided id does not exists in the database',
  })
  async findOne(@Param('id') id: string) {
    const article = await this.articleService.findOne(Number(id));

    if (!article) {
      throw new NotFoundException('Article not found!');
    }

    return article;
  }

  @Put(':id')
  @ApiBody({
    type: [UpdateArticleDto],
  })
  @ApiOkResponse({
    description: 'Update an article',
  })
  @ApiNotFoundResponse({
    description:
      'Return not found when the article with the provided id does not exists in the database',
  })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
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
  @ApiOkResponse({
    description: 'Remove an article',
  })
  @ApiNotFoundResponse({
    description:
      'Return not found when the article with the provided id does not exists in the database',
  })
  async remove(@Param('id') id: string) {
    return this.articleService.remove(Number(id));
  }
}
