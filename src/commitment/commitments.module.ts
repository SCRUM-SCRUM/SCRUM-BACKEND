/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Commitment, CommitmentSchema } from './commitments.schema';
import { CommitmentsService } from './commitments.service';
import { CommitmentsController } from './commitments.controller';
import { CommitmentsGateway } from './commitments.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { CommitmentsCron } from './commitments.cron';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Commitment.name, schema: CommitmentSchema }]),
    ScheduleModule.forRoot(),
  ],
  providers: [CommitmentsService, CommitmentsGateway, CommitmentsCron],
  controllers: [CommitmentsController],
  exports: [CommitmentsService],
})
export class CommitmentsModule {}
