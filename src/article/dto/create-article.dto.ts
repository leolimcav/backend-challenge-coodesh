export class CreateArticleDto {
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  featured = false;
}
