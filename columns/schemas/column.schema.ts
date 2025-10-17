/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Workspace } from '@/workspace/schemas/workspace.schema';
import { WorkspaceTask } from '@/workspace/schemas/workspacetask.schema';

export enum ColumnName {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
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

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'WorkspaceTask' }],
    default: [],
  })
  tasks: WorkspaceTask[];

  @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
  workspace: Workspace;
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
