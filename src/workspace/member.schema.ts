/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Workspace } from './schemas/workspace.schema';

@Schema({ timestamps: true })
export class Member extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
  workspace: Workspace | Types.ObjectId;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
