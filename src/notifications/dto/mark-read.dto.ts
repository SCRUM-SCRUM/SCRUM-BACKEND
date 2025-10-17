/* eslint-disable prettier/prettier */
import { IsUUID } from 'class-validator';

export class MarkReadDto {
  @IsUUID()
  notificationId: string;
}
