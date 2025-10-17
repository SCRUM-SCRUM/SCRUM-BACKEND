/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// ⚠️ Import HydratedDocument instead of Document for the final type
import { Document, Types, HydratedDocument } from 'mongoose';
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

  // MongoDB automatically handles createdAt/updatedAt with timestamps
  // You don't need to explicitly define this if timestamps: true is used, 
  // but keeping it won't hurt, though the schema property type is usually enough.
  createdAt: Date; 
  updatedAt: Date; // Added standard Mongoose timestamp field

  // References (Relations)
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Notification' }] })
  notifications: Notification[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
// ✅ CORRECT FIX: Use HydratedDocument<User> which merges the schema fields 
// with the Mongoose Document methods and properties (like _id) correctly.
export type UserDocument = HydratedDocument<User>;