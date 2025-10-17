/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Workspace } from '@/workspace/schemas/workspace.schema';
import { Task } from '@/tasks/schemas/task.schema';

export enum ColumnName {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  QA = 'QA',
  BLOCKED = 'Blocked',
  DONE = 'Done',
}

@Schema({ timestamps: true })
export class Column extends Document {
  @Prop({ type: String, enum: ColumnName, required: true })
  name: ColumnName;

  @Prop({ type: Number, default: 0 })
  order: number;

  // 🔗 Relationship with Workspace
  @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
  workspace: Workspace | Types.ObjectId;

  // 🔗 Relationship with Tasks
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }], default: [] })
  tasks: (Task | Types.ObjectId)[];
}

export type ColumnDocument = Column & Document;
export const ColumnSchema = SchemaFactory.createForClass(Column);
