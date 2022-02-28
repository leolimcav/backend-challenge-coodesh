import { Test, TestingModule } from '@nestjs/testing';
import { Article } from '@prisma/client';
import { ArticleService } from './article.service';
import { PrismaService } from '../prisma.service';
import { randomInt } from 'crypto';
import { faker } from '@faker-js/faker';
import { CreateArticleDto } from './dto/create-article.dto';


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

    it('should return null when article with provided id is not found', async () => {
      const id = randomInt(100);
      prisma.article.findFirst = jest.fn().mockReturnValueOnce(null);

      const result = await service.findOne(id);

      expect(result).toBeNull();
    });
  });

  describe('Create Articles', () => {
    it('should create an article', async () => {
      const payload: CreateArticleDto = {
        title: faker.datatype.string(),
        url: faker.internet.url(),
        imageUrl: faker.image.imageUrl(),
        summary: faker.lorem.text(),
        newsSite: faker.internet.domainName(),
        featured: false,
        publishedAt: new Date()
      };

      prisma.article.create = jest.fn().mockReturnValueOnce({ id: randomInt(100), ...payload });

      const result = await service.create(payload);

      expect(result).toBeDefined();
      expect(result.title).toBe(payload.title);
    });
  });
});
