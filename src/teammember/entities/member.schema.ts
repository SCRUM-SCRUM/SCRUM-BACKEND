/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Member extends Document {
  @Prop({ required: true })
  name: string; // e.g. John Doe

  @Prop({ required: true })
  role: string; // e.g. Frontend Developer

  @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
  team: Types.ObjectId; // Reference to the team this member belongs to
}

export const MemberSchema = SchemaFactory.createForClass(Member);
