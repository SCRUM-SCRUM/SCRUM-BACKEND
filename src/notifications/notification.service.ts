/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateResult} from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Task } from '../tasks/task.schema';
import { Types } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
  ) {}

  // CREATE NOTIFICATION
  async create(userId:string, dto: CreateNotificationDto): Promise<NotificationDocument> {
    const notification = new this.notificationModel({
      ...dto,
      recipient: new Types.ObjectId(userId),
    });
    return await notification.save();
  }

  // GET USER NOTIFICATIONS
  async findUserNotifications(userId: string, limit = 20, cursor?: Date) {
    const query: Record<string, unknown> = { recipient: new Types.ObjectId(userId) };
    if (cursor) query['createdAt'] = { $lt: cursor };

    const notifications = await this.notificationModel
  .find(query)
  .sort({ createdAt: -1 })
  .limit(limit)
  .lean()
  .exec();


    const taskLinks = notifications
      .filter((notif) => notif.link?.startsWith('/tasks/'))
      .map((notif) => notif.link?.split('/tasks/')[1] || '');

    const existingTasks = taskLinks.length
      ? await this.taskModel.find(
          { _id: { $in: taskLinks.filter(Boolean) } },
          { _id: 1 },
        ).lean().exec()
      : [];

    const validTaskIds = new Set(
  existingTasks.map((t) => (t._id as Types.ObjectId).toString()),
);
    return notifications.map((notif) => ({
      ...notif,
      isValid:
        !notif.link?.startsWith('/tasks/') ||
        validTaskIds.has(notif.link?.split('/tasks/')[1] || ''),
    }));
  }

  // UNREAD COUNT
  async unreadCount(userId: string): Promise<number> {
    return this.notificationModel.countDocuments({
      recipient: userId,
      isRead: false,
    });
  }

  // MARK ALL AS READ
  async markAllAsRead(userId: string): Promise<UpdateResult> {
    const result = await this.notificationModel.updateMany(
      { recipient: userId, isRead: false },
      { $set: { isRead: true } },
    );
    return result;
  }

  // MARK ONE AS READ
  async markOneAsRead(id: string): Promise<NotificationDocument | null> {
    return this.notificationModel.findByIdAndUpdate(
      id,
      { $set: { isRead: true } },
      { new: true },
    );
  }

  // MARK ONE AS UNREAD
  async markOneAsUnread(id: string): Promise<NotificationDocument | null> {
    return this.notificationModel.findByIdAndUpdate(
      id,
      { $set: { isRead: false } },
      { new: true },
    );
  }

  // DELETE (soft delete with isDeleted flag if needed)
  async deleteNotification(id: string): Promise<NotificationDocument | null> {
    return this.notificationModel.findByIdAndDelete(id);
  }

  // RESTORE — only if you use soft delete
  async restore(id: string): Promise<NotificationDocument | null> {
    return this.notificationModel.findByIdAndUpdate(
      id,
      { $set: { isDeleted: false } },
      { new: true },
    )
  }
}