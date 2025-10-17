/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Comment } from 'src/comments/comment.schema';

@Schema({ timestamps: true })
export class CalendarTask extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Date, required: false })
  dueDate?: Date;

  @Prop({ type: Date, required: false })
  startDate?: Date;

  @Prop({ type: Date, required: false })
  endDate?: Date;

  @Prop({ default: 'To Do' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'CalendarWorkspace', required: true })
  workspaceId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CalendarUser', required: false })
  assigneeId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }], default: [] })
  comments?: Types.ObjectId[];
}

export const CalendarTaskSchema = SchemaFactory.createForClass(CalendarTask);
