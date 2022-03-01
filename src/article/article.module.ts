import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ArticleController],
  providers: [PrismaService, ArticleService],
})
export class ArticleModule {}
