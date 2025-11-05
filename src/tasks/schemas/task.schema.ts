/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/user.schema';
import { Column } from '../../columns/schemas/column.schema';
import { Subtask } from '../../subtask/schemas/subtask.schema';
import { Comment } from '../../comments/comment.schema';

export enum TaskStatus {
  TODO = 'Todo',
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  QA = 'QA',
  BLOCKED = 'Blocked',
  DONE = 'Done',
  REVIEW = 'Review',
  TESTING = 'Testing',
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum Category {
  Calendar = 'Calendar',
  Workspace = 'Workspace',
  IMPROVEMENT = 'Improvement',
  Task = 'Task',
}

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: String, ref: 'User' })
  assignee?: string;

  @Prop()
  dueDate?: Date;

  @Prop({ type: String, enum: Object.values(TaskStatus), default: TaskStatus.TODO })
  status: TaskStatus;

  @Prop({ type: String, enum: Object.values(Priority), default: Priority.MEDIUM })
  priority: Priority;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: String, enum: Object.values(Category), default: Category.Calendar })
  category: Category;

  @Prop({ type: Types.ObjectId, ref: 'Column', required: false })
  column?: Column | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  assigneeUser?: User | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subtask' }], default: [] })
  subtasks?: (Subtask | Types.ObjectId)[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }], default: [] })
  comments?: (Comment | Types.ObjectId)[];
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
