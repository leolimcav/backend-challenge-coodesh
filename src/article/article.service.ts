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
        featured,
        publishedAt: new Date()
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

  async update(id: number, { title, url, imageUrl, summary, featured, newsSite }: UpdateArticleDto): Promise<Article | null> {
    try {
      return await this.prisma.article.update({
        where: {
          id,
        },
        data: {
          title,
          url,
          imageUrl,
          summary,
          featured,
          newsSite
        }
      });
    } catch (error) {
      return null;
    }
  }

  async remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id
      }
    });
  }
}
