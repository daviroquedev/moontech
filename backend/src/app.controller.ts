import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getStatus() {
    return {
      status: 'OK',
      message: 'API ok',
      version: '1.0.0',
    };
  }
}
