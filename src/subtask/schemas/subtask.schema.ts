/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Task } from '../../tasks/task.schema';

export type SubtaskDocument = Subtask & Document;

@Schema({ timestamps: true })
export class Subtask {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  isDone: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  task: Types.ObjectId | Task;
}

export const SubtaskSchema = SchemaFactory.createForClass(Subtask);
