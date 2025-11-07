/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  Post,
  Body,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { BadRequestException } from '@nestjs/common'; // Import for error handling

export interface NotificationResponse {
  // existing notification fields (keep flexible)
  _id?: string;
  recipient?: string;
  type?: string;
  message?: string;
  link?: string;
  createdAt?: string;
  isRead?: boolean;
  isDeleted?: boolean;
  __v?: number;
  // computed field added by service
  isValid?: boolean;
}

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notifications: NotificationService) {}

  // create a notification (for admin or internal use)
  @Post()
  async create(
    @Body() dto: CreateNotificationDto,
    @Body('userId') userId?: string,
  ): Promise<{ message: string; created: NotificationResponse }> {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const created = await this.notifications.create(userId as any, dto);
    return { message: 'Notification created successfully', created: created as unknown as NotificationResponse };
  }

  // GET user notifications (cursor pagination: ?limit=20&cursor=2025-10-16T00:00:00.000Z)
  @Get('user/:userId')
  async findUserNotifications(
    @Param('userId') userId: string,
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
  ): Promise<NotificationResponse> {
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    const parsedCursor = cursor ? new Date(cursor) : undefined;
    // Service returns lean objects enhanced with isValid: boolean — not full Mongoose docs.
    const notifications = await this.notifications.findUserNotifications(
      userId,
      parsedLimit,
      parsedCursor,
    );
    return notifications as unknown as NotificationResponse;
  }

  // UNREAD COUNT
  @Get('user/:userId/unread-count')
  async unreadCount(@Param('userId') userId: string): Promise<{ count: number }> {
    const count = await this.notifications.unreadCount(userId);
    return { count };
  }

  // MARK ALL AS READ
  @Patch('user/:userId/mark-all-read')
  async markAllAsRead(@Param('userId') userId: string): Promise<{message: string; count: number}> {
    const result = await this.notifications.markAllAsRead(userId);
    
    return {
      message: 'All notifications marked as read succesfully',
      count: result?.modifiedCount ?? 0,
    };
  }

  // MARK ONE AS READ
  @Patch(':id/read')
  async markOneAsRead(@Param('id') id: string): Promise<NotificationResponse | null> {
    const updated = await this.notifications.markOneAsRead(id);
    return updated ? (updated.toObject ? updated.toObject() : updated) as NotificationResponse : null;
  }

  // MARK ONE AS UNREAD
  @Patch(':id/unread')
  async markOneAsUnread(@Param('id') id: string): Promise<NotificationResponse | null> {
    const updated = await this.notifications.markOneAsUnread(id);
    return updated ? (updated.toObject ? updated.toObject() : updated) as NotificationResponse : null;
  }

  // DELETE notification (hard delete)
  @Delete(':id')
  async deleteNotification(@Param('id') id: string): Promise<{ message: string } | null> {
    const deleted = await this.notifications.deleteNotification(id);
    if (!deleted) return null;
    return { message: 'Notification deleted' };
  }

  // RESTORE (for soft-delete setups)
  @Patch(':id/restore')
  async restore(@Param('id') id: string): Promise<NotificationResponse | null> {
    const restored = await this.notifications.restore(id);
    return restored ? (restored.toObject ? restored.toObject() : restored) as NotificationResponse : null;
  }
}