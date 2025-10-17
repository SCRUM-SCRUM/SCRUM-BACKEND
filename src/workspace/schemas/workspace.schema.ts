/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Member } from '../../teammember/entities/member.schema';
import { WorkspaceTask } from './workspacetask.schema';
import { ColumnModule } from 'columns/column.module';

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Workspace {
  @Prop({ required: true, unique: true })
  name: string;

  // Relation: One Workspace has many Members
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Member' }], default: [] })
  members: Member[];

  // Relation: One Workspace has many Tasks
  @Prop({ type: [{ type: Types.ObjectId, ref: 'WorkspaceTask' }], default: [] })
  tasks: WorkspaceTask[];

  // Relation: One Workspace has many Columns
  @Prop({ type: [{ type: Types.ObjectId, ref: 'ColumnSchema' }], default: [] })
  columns: ColumnModule[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export type WorkspaceDocument = Workspace & Document;
export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
