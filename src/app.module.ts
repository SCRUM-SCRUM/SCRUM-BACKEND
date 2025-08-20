import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { DashboardModule } from './dashboard/dashboard.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ColumnModule } from './columns/column.module';
import { TaskModule } from './tasks/task.module';
import { SubtaskModule } from './subtask/subtask.module';
import { EventsGateway } from './events/events.gateway';
import { CalendarModule } from './calendar/calendar.module';
import { Task } from './tasks/entities/task.entity';
import { Subtask } from './subtask/entities/subtask.entity';
import { ColumnEntity } from './columns/entities/column.entity';
import { CalendarWorkspace } from './entities/calendarworkspace.entity';
import { Workspace } from './workspace/entities/workspace.entity';
import { Member } from './workspace/member.entity';
import { CalendarTask } from './entities/calendartask.entity';
import { WorkspaceTask } from './workspace/entities/workspacetask.entity';
import { WorkspaceSubtask } from './workspace/entities/WorkspaceSubtask.entity';
import { CalendarUser } from './entities/calendaruser.entity';
import { CommentModule } from './comments/comment.module';
import { Comment } from './comments/comment.entity';
import { Notification } from './notifications/entities/notification.entity';
import { Meeting } from './dashboard/entities/meeting.entity';
import { NotificationModule } from './notifications/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'newscrum',
        entities: [
          User,
          Task,
          Subtask,
          ColumnEntity,
          Workspace,
          CalendarWorkspace,
          Member,
          CalendarTask,
          WorkspaceTask,
          WorkspaceSubtask,
          CalendarUser,
          Comment,
          Notification, 
          Meeting
        ],
        synchronize: true,
        logging: process.env.NODE_ENV === 'development',
      }),
    }),

    AuthModule,
    UsersModule,
    DashboardModule,
    WorkspaceModule,
    ColumnModule,
    TaskModule,
    SubtaskModule,
    CalendarModule,
    CommentModule,
    NotificationModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
