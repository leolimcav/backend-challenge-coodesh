import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 0 9 * * *')
  handleCron() {
    this.logger.debug(
      `${new Date()} - Running database update from Spaceflight News API`,
    );
  }
}
