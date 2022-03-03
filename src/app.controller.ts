import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description:
      "Returns the string 'Back-end Challenge 2021 🏅 - Space Flight News'",
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
