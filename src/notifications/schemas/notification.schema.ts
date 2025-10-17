/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/user.schema'; // 

export type NotificationDocument = Notification & Document;

export type NotificationType = 'mention' | 'assignment' | 'due-soon' | 'status-change';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Notification {
  @Prop({ type: String, default: () => new Types.ObjectId().toString() })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  recipient: Types.ObjectId | User;

  @Prop({ type: String, enum: ['mention', 'assignment', 'due-soon', 'status-change'], required: true })
  type: NotificationType;

  @Prop({ required: true })
  message: string;

  @Prop()
  link?: string;

  @Prop({ type: Boolean, default: false, index: true })
  isRead: boolean;

  @Prop({ type: Date, default: Date.now, index: true })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
