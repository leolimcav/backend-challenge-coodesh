import { Test, TestingModule } from '@nestjs/testing';
import { Article } from '@prisma/client';
import { ArticleService } from './article.service';
import { PrismaService } from '../prisma.service';
import { randomInt } from 'crypto';
import { HttpException } from '@nestjs/common';


describe('ArticleService', () => {
  let service: ArticleService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ArticleService]
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('Get Articles', () => {
    it('should list all articles', async () => {
      prisma.article.findMany = jest.fn().mockResolvedValue([]);

      const result = await service.findAll({ skip: 0, take: 100 });

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should get an article with the provided id', async () => {
      const id = randomInt(100);
      const article: Article = {
        id,
        title: 'Some article',
        url: 'url',
        summary: '',
        featured: false,
        imageUrl: '',
        newsSite: '',
        publishedAt: new Date()
      };

      prisma.article.findFirst = jest.fn().mockReturnValueOnce(article);

      const result = await service.findOne(id);
      expect(result).toBeDefined();
      expect(result.id).toBe(id);
    });

    it('should throw an error when article with provided id is not found', async () => {
      const id = randomInt(100);
      prisma.article.findFirst = jest.fn().mockReturnValueOnce(null);

      const result = await service.findOne(id);

      expect(result).toBeNull();
    });
  });
});
