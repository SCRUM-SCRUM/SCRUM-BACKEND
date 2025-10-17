/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database.module';

// Feature Modules
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ColumnModule } from './columns/column.module';
import { TaskModule } from './tasks/task.module';
import { SubtaskModule } from './subtask/subtask.module';
import { CalendarModule } from './calendar/calendar.module';
import { CommentModule } from './comments/comment.module';
import { NotificationModule } from './notifications/notification.module';
import { CommitmentsModule } from './commitment/commitments.module';
import { TeamsModule } from './teams/teams.module';
import { ProjectModule } from './project/project.module';

// Other providers
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    // 🔧 Global Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 🧠 Connect MongoDB (via Mongoose)
MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/scrumdb'),

    // 🕒 For scheduled tasks
    ScheduleModule.forRoot(),

    // 🚀 Feature modules
    AuthModule,
    DatabaseModule,
    UserModule,
    DashboardModule,
    WorkspaceModule,
    ColumnModule,
    TaskModule,
    SubtaskModule,
    CalendarModule,
    CommentModule,
    NotificationModule,
    CommitmentsModule,
    TeamsModule,
    ProjectModule,
  ],

  providers: [EventsGateway],
})
export class AppModule {}
