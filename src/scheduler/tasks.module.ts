import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma.service";
import { TasksService } from "./tasks.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 5,
        baseURL: configService.get('SPACEFLIGHT_API_URL'),
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [TasksService, PrismaService]
})

export class TasksModule { };
