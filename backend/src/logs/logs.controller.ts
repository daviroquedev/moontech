import { Controller, Get, UseGuards } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './schemas/log.schema';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Registros')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros' })
  @ApiResponse({ status: 200, description: 'Lista de registros retornada correctamente.' })
  async getAllLogs(): Promise<Log[]> {
    return this.logsService.findAll();
  }

}