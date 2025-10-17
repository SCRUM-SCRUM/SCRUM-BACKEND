/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationCleanup {
  private readonly logger = new Logger(NotificationCleanup.name);

  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  // Runs daily at midnight
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async hardDeleteOldSoftDeletedNotifications() {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const result = await this.notificationModel.deleteMany({
      deletedAt: { $lt: threeDaysAgo },
    });

    this.logger.log(`🧹 Deleted ${result.deletedCount} notifications older than 3 days`);
  }
}
