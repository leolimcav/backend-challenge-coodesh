import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

type Options = {
  skip: number;
  take: number;
}

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) { }

  async create({ title, url, imageUrl, newsSite, summary, featured }: CreateArticleDto): Promise<Article> {
    return this.prisma.article.create({
      data: {
        title,
        url,
        imageUrl,
        newsSite,
        summary,
        featured
      }
    });
  }

  async findAll({ skip, take }: Options): Promise<Array<Article>> {
    return this.prisma.article.findMany({
      skip,
      take,
      orderBy: {
        publishedAt: 'desc'
      }
    });
  }

  async findOne(id: number): Promise<Article | null> {
    return this.prisma.article.findFirst({
      where: {
        id
      }
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
