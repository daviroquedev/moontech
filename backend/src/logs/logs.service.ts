import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schemas/log.schema';
import { LogsGateway } from './logs.gateway';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
    private logsGateway: LogsGateway,
  ) {}

  async createLog(userId: string, isLogin: boolean): Promise<Log> {
    const newLog = new this.logModel({
      usuario: userId,
      login: isLogin,
    });

    const savedLog = await newLog.save();

    this.logsGateway.emitLog(savedLog);

    return savedLog;
  }
}