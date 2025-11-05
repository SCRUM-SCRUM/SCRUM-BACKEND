/* eslint-disable prettier/prettier */
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubtaskDto {
  @IsNotEmpty()
  @IsMongoId()
  taskId: number;

  @IsNotEmpty()
  @IsString()
  title: string;
}
