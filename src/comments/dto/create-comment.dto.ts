/* eslint-disable prettier/prettier */
import { IsMongoId, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsMongoId({ message: 'Invalid taskId, must be Mongo ObjectId' })
  taskId: string;

  @IsMongoId({ message: 'Invalid userId, must be Mongo ObjectId' })
  userId: string;
}