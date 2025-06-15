import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsService } from './logs.service';
import { Log, LogSchema } from './schemas/log.schema';
import { LogsGateway } from './logs.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [LogsService, LogsGateway],
  exports: [LogsService],
})
export class LogsModule {}
