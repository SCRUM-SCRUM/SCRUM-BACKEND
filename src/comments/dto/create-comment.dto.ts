/* eslint-disable prettier/prettier */
import { IsMongoId, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  content: string;

  @IsMongoId({ message: 'Invalid taskId, must be Mongo ObjectId' })
  taskId: string;

  @IsMongoId({ message: 'Invalid userId, must be Mongo ObjectId' })
  userId: string;
}