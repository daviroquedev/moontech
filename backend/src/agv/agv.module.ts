import { Module } from '@nestjs/common';
import { AgvGateway } from './agv.gateway';
import { AgvService } from './agv.service';

@Module({
  providers: [AgvGateway, AgvService],
  exports: [AgvService],
})
export class AgvModule {}
