/* eslint-disable prettier/prettier */
// src/subtasks/schemas/subtask.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Task } from '../../tasks/task.schema';

export type SubtaskDocument = Subtask & Document;

@Schema()
export class Subtask {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  isDone: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  task: Types.ObjectId | Task;
}

export const SubtaskSchema = SchemaFactory.createForClass(Subtask);