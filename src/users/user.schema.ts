/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Notification } from '.././notifications/schemas/notification.schema';
import { Task } from '.././tasks/schemas/task.schema';
import { Comment } from '.././comments/comment.schema';

@Schema({ timestamps: true })
export class User { // 💡 User class should NOT extend Document
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ type: String, default: null })
  verificationToken: string;

  createdAt: Date; 
  updatedAt: Date; // Added standard Mongoose timestamp field

  // References (Relations)
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Notification' }] })
  notifications: Notification[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];

  @Prop({
    type: String,
    enum:['member', 'admin', 'scrum_master'],
    default: 'member',
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;