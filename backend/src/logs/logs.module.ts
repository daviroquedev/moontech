import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsService } from './logs.service';
import { Log, LogSchema } from './schemas/log.schema';
import { LogsGateway } from './logs.gateway';
import { LogsController } from './logs.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [LogsService, LogsGateway],
  exports: [LogsService],
  controllers: [LogsController],
})
export class LogsModule {}
