import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty()
  title: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  newsSite: string;
  @ApiProperty()
  summary: string;
  @ApiProperty({
    default: false,
    required: false,
  })
  featured?: boolean;
  @ApiProperty()
  publishedAt: string;
}
