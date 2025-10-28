/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from './user-role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'polaris' })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.DEVELOPER,
  })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;

  // Instead of @OneToMany, we use arrays of ObjectIds for Mongo relations
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
