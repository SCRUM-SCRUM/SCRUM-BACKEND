/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Activity extends Document {
  @Prop({ required: true })
  type: string; // e.g. 'TASK_CREATED', 'USER_JOINED', etc.

  @Prop({ required: true })
  description: string;

  @Prop({ type: String })
  userId: string; // related user

  @Prop({ type: String })
  workspaceId: string; // related workspace
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
