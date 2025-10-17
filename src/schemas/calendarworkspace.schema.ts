/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CalendarWorkspace extends Document {
  @Prop({ required: true })
  name: string;
}

export const CalendarWorkspaceSchema = SchemaFactory.createForClass(CalendarWorkspace);
