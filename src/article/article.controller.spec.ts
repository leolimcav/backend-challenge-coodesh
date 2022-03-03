import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

describe('ArticleController', () => {
  let controller: ArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [PrismaService, ArticleService],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
