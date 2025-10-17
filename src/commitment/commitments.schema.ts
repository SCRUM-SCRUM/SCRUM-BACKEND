/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum CommitmentStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

@Schema({ timestamps: true })
export class Commitment extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Date })
  dueDate?: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  assigneeId?: string;

  @Prop()
  linkedTaskId?: string;

  @Prop({ enum: ['High', 'Medium', 'Low'], default: 'Medium' })
  priority: 'High' | 'Medium' | 'Low';

  @Prop({ enum: CommitmentStatus, default: CommitmentStatus.NOT_STARTED })
  status: CommitmentStatus;

  @Prop({ default: false })
  archived: boolean;
}

export const CommitmentSchema = SchemaFactory.createForClass(Commitment);
