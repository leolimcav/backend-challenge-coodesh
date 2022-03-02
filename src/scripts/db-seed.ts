import { pipeline, Writable, Readable, Transform } from 'stream';
import { promisify } from 'util';

import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { CreateArticleDto } from '../article/dto/create-article.dto';

const prisma = new PrismaClient();
const abortController = new AbortController();
const api = axios.create({
  baseURL: process.env.SPACEFLIGHT_API_URL,
  signal: abortController.signal,
});

const pipelineAsync = promisify(pipeline);

async function populateDatabase() {

  const { data: count } = await api.get<Number>('/articles/count');

  let skip = 0;
  let take = 250;
  let error = false;

  while (skip < count) {
    console.log(`Fetching at: ${skip}`);
    await api.get<CreateArticleDto[]>(`/articles?_start=${skip}&_limit=${take}`)
      .then(async ({ data }) => {
        const readable = new Readable({
          read: function() {
            this.push(JSON.stringify(data));
            this.push(null);
          }
        });

        const transformToObject = new Transform({
          transform(chunk, _, cb) {
            let articles = JSON.parse(chunk);
            let articlesDto = new Array<CreateArticleDto>();

            articles.forEach(article => {
              const articleDto = new CreateArticleDto();
              articleDto.title = article.title;
              articleDto.url = article.url;
              articleDto.summary = article.summary;
              articleDto.imageUrl = article.imageUrl;
              articleDto.newsSite = article.newsSite;
              articleDto.featured = article.featured;
              articleDto.publishedAt = article.publishedAt;

              articlesDto.push(articleDto);
            });

            cb(null, JSON.stringify(articlesDto));
          }
        });

        const writable = new Writable({
          async write(chunk, _, cb) {
            const articles = JSON.parse(chunk);
            await prisma.article.createMany({
              data: articles,
            });

            cb();
          }
        });

        await pipelineAsync(
          readable,
          transformToObject,
          writable
        );
      })
      .catch((err) => {
        console.log(err.toJSON());
        error = true;
        abortController.abort();
      });

    if (error) {
      break;
    }

    skip += take;
  }
}

prisma.$connect();

populateDatabase();

prisma.$disconnect();

