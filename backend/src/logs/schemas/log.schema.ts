import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type LogDocument = Log & mongoose.Document;

@Schema({ timestamps: { createdAt: 'fecha', updatedAt: false } })
export class Log {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  usuario: User;

  @Prop({ required: true })
  login: boolean; 
}

export const LogSchema = SchemaFactory.createForClass(Log);
