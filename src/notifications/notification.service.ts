import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository, LessThan, In } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from '../users/user.entity';
import { Task } from '../task/entities/task.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>
  ) {}

  async create(user: User, dto: CreateNotificationDto) {
    const notification = this.notificationRepo.create({
      ...dto,
      recipient: { id: user.id } as User,
    });
    return this.notificationRepo.save(notification);
  }

  async findUserNotifications(userId: string, limit = 20, cursor?: Date) {
    const notifications = await this.notificationRepo.find({
      where: {
        recipient: { id: Number(userId) },
        ...(cursor && { createdAt: LessThan(cursor) }),
      },
      order: { createdAt: 'DESC' },
      take: limit,
    });

    const taskLinks = notifications
      .filter(notif => notif.link?.startsWith('/tasks/'))
      .map(notif => notif.link.split('/tasks/')[1]);

    const existingTasks = taskLinks.length > 0
      ? await this.taskRepo.find({ 
          where: { id: In(taskLinks) }, 
          select: ['id'] 
        })
      : [];

    const validTaskIds = new Set(existingTasks.map(t => t.id));

    return notifications.map(notif => ({
      ...notif,
      isValid: !notif.link?.startsWith('/tasks/') || validTaskIds.has(notif.link.split('/tasks/')[1]),
    }));
  }

  async unreadCount(userId: string) {
    return this.notificationRepo.count({
      where: { recipient: { id: Number(userId) }, isRead: false },
    });
  }

  async markAllAsRead(userId: string) {
    await this.notificationRepo.update(
      { recipient: { id: Number(userId) }, isRead: false },
      { isRead: true }
    );
  }

  async markOneAsRead(id: string) {
    return this.notificationRepo.update(id, { isRead: true });
  }

  async markOneAsUnread(id: string) {
    return this.notificationRepo.update(id, { isRead: false });
  }

  async delete(id: string) {
    return this.notificationRepo.softDelete(id);
  }

  async restore(id: string) {
    return this.notificationRepo.restore(id);
  }
}