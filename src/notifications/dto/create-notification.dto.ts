/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsIn } from 'class-validator';
import { NotificationType } from '../schemas/notification.schema';

export class CreateNotificationDto {
  @IsIn(['mention', 'assignment', 'due-soon', 'status-change'])
  type: NotificationType;

  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  link?: string;
}
