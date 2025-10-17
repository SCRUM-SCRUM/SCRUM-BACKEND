/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { WorkspaceTask } from './workspacetask.schema';

@Schema({ timestamps: true })
export class WorkspaceSubtask extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Types.ObjectId, ref: 'WorkspaceTask', required: true })
  task: WorkspaceTask;
}

export const WorkspaceSubtaskSchema = SchemaFactory.createForClass(WorkspaceSubtask);
