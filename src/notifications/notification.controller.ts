import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req, Delete, Put, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateNotificationDto) {
    return this.notificationService.create(req.user, dto);
  }

  @Get()
  findAll(
    @Req() req,
    @Query('limit') limit = '20',
    @Query('cursor') cursor?: string, 
  ) {
    return this.notificationService.findUserNotifications(
      req.user.userId,
      Number(limit),
      cursor ? new Date(cursor) : undefined,
    );
  }

  @Get('unread-count')
  unreadCount(@Req() req) {
    return this.notificationService.unreadCount(req.user.userId);
  }

  @Patch('mark-all-read')
  markAllAsRead(@Req() req) {
    return this.notificationService.markAllAsRead(req.user.userId);
  }

  @Patch(':id/read')
  markOneAsRead(@Param('id') id: string) {
    return this.notificationService.markOneAsRead(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }

  @Put(':id/restore')
  restore(@Param('id') id: string) {
    return this.notificationService.restore(id);
  }

  @Patch(':id/unread')
  markOneAsUnread(@Param('id') id: string) {
    return this.notificationService.markOneAsUnread(id);
  }
}