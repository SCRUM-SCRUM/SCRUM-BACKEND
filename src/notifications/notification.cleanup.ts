import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationCleanup {
  private readonly logger = new Logger(NotificationCleanup.name);

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  // Runs daily at midnight
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async hardDeleteOldSoftDeletedNotifications() {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const result = await this.notificationRepo.delete({
      deletedAt: LessThan(threeDaysAgo),
    });

    this.logger.log(`Deleted ${result.affected} notifications older than 3 days`);
  }
}
