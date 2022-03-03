import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
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
