import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { addDays, getDate, getDay, getYear, getMonth } from 'date-fns';
import { map } from 'rxjs';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private httpService: HttpService, private prismaService: PrismaService) { }

  @Cron('0 0 9 * * *')
  async handleCron(): Promise<void> {
    try {
      const now = new Date();
      const yesterdayAt9Am = new Date(getYear(now), getMonth(now), getDay(now) - 1, 0, 0, 0, 0).toISOString();

      this.logger.log(
        `${now.toISOString()} - Running database update from Spaceflight News API`,
      );

      this.logger.log(`Fetching data from Spaceflight News API with date starting from: ${yesterdayAt9Am}`);
      const response = this.httpService.get(`/articles?_sort=publishedAt:asc&publishedAt_gte=${yesterdayAt9Am}`);

      const data = response.pipe(map(resp => resp.data));
      let articles = [];

      await data.forEach(val => {
        articles = val;
      });

      const articlesDto: CreateArticleDto[] = articles.map(article => {
        const articleDto = new CreateArticleDto();
        articleDto.title = article.title;
        articleDto.url = article.url;
        articleDto.newsSite = article.newsSite;
        articleDto.imageUrl = article.imageUrl;
        articleDto.summary = article.summary;
        articleDto.featured = article.featured;
        articleDto.publishedAt = article.publishedAt;

        return articleDto;
      });

      this.logger.log("INSERTING INTO THE DATABASE");
      await this.prismaService.article.createMany({
        data: articlesDto
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.log("An error ocurred with the request", error);
      }
      this.logger.log("An error occurred when updating the database", error);
    }
  }
}
