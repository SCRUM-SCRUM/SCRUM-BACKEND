import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TaskModule } from './task/task.module';
import { NotificationModule } from './notifications/notification.module';
import { EventsGateway } from './events/events.gateway';
import { User } from './users/user.entity';
import { Notification } from './notifications/entities/notification.entity';
import { Task } from './task/entities/task.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'scrum',
      entities: [User, Notification, Task],
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsersModule,
    DashboardModule,
    TaskModule,
    NotificationModule, 
  ],
  providers: [EventsGateway],
})
export class AppModule {}