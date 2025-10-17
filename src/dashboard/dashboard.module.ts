/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TaskModule } from '../tasks/task.module';
import { UserModule } from '../users/users.module';
import { WorkspaceModule } from '@/workspace/workspace.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Meeting, MeetingSchema } from './schemas/meeting.schema';

@Module({
  imports: [
    TaskModule,
    UserModule,
    WorkspaceModule,
    MongooseModule.forFeature([
      { name: Meeting.name, schema: MeetingSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
