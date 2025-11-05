/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Workspace } from '../../workspace/workspace.schema';
import { Task } from '../../tasks/task.schema';

export enum ColumnName {
  TODO = 'Todo',
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  QA = 'QA',
  BLOCKED = 'Blocked',
  DONE = 'Done',
  REVIEW = 'Review',
  TESTING = 'Testing',
}

@Schema({ timestamps: true })
export class Column extends Document {
  @Prop({
    type: String,
    enum: ColumnName,
    required: true,
  })
  name: ColumnName;

  @Prop({ type: Number, default: 0 })
  order: number;

  @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
  workspace: Workspace | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }], default: [] })
  tasks: (Task | Types.ObjectId)[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
export const ColumnModule = SchemaFactory.createForClass(Column);