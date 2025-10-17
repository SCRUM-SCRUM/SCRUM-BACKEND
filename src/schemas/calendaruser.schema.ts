/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Comment } from 'src/comments/comment.schema';

@Schema({ timestamps: true })
export class CalendarUser extends Document {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  isActive: boolean;

  // Relationship: one user → many calendar tasks
  @Prop({ type: [{ type: Types.ObjectId, ref: 'CalendarTask' }], default: [] })
  calendarTasks?: Types.ObjectId[];

  // Relationship: one user → many comments
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }], default: [] })
  comments?: Types.ObjectId[];
}

export const CalendarUserSchema = SchemaFactory.createForClass(CalendarUser);
