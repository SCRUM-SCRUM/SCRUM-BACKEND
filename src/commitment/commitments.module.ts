import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commitment } from './commitments.entity';
import { CommitmentsService } from './commitments.service';
import { CommitmentsController } from './commitments.controller';
import { CommitmentsGateway } from './commitments.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { CommitmentsCron } from './commitments.cron';

@Module({
  imports: [TypeOrmModule.forFeature([Commitment])],
  providers: [CommitmentsService, CommitmentsGateway, CommitmentsCron],
  controllers: [CommitmentsController],
  exports: [CommitmentsService],
})
export class CommitmentsModule {}