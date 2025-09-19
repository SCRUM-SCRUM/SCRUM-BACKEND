import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CommitmentsService } from './commitments.service';

@Injectable()
export class CommitmentsCron {
  private readonly logger = new Logger(CommitmentsCron.name);

  constructor(private readonly svc: CommitmentsService) {}

  // run every hour
@Cron(CronExpression.EVERY_HOUR)
  async handleArchive() {
    this.logger.log('Running archiveOldCompleted');
    try {
      const res = await this.svc.archiveOldCompleted();
      this.logger.log(`Archived ${res.archived} commitments`);
    } catch (err) {
      this.logger.error('Error in archive cron', err as any);
    }
  }
}