/* eslint-disable prettier/prettier */
// calendartask.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CalendarTaskDocument = CalendarTask & Document;

@Schema()
export class CalendarTask {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ default: 'To Do' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  calendarUser: Types.ObjectId;

  // Add other properties as needed
}

export const CalendarTaskSchema = SchemaFactory.createForClass(CalendarTask);