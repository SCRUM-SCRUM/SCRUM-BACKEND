/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Member } from '../../teammember/entities/member.schema';

@Schema({ timestamps: true })
export class Team extends Document {
  @Prop({ type: String, required: true })
  name: string; // e.g. Development Team

  @Prop({ type: Number, default: 0 })
  memberCount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Member' }] })
  members: Member[];

}
export const TeamSchema = SchemaFactory.createForClass(Team);
