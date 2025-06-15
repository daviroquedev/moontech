// src/logs/logs.controller.ts
import { Controller, Get } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './schemas/log.schema';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  async getAllLogs(): Promise<Log[]> {
    return this.logsService.findAll();
  }
}
