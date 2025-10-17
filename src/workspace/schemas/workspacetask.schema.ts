/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Workspace } from './workspace.schema';
import { WorkspaceSubtask } from './WorkspaceSubtask.schema';

@Schema()
export class WorkspaceTask {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ 
    type: String, 
    enum: ['todo', 'in-progress', 'done'], 
    default: 'todo' 
  })
  status: 'todo' | 'in-progress' | 'done';

  // Relation: each task belongs to one workspace
  @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
  workspace: Workspace;

  // Relation: a task can have multiple subtasks
  @Prop({ type: [{ type: Types.ObjectId, ref: 'WorkspaceSubtask' }], default: [] })
  subtasks: WorkspaceSubtask[];
}

export type WorkspaceTaskDocument = WorkspaceTask & Document;
export const WorkspaceTaskSchema = SchemaFactory.createForClass(WorkspaceTask);
