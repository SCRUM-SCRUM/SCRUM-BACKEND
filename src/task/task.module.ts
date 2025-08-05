// task.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { EventsGateway } from '../events/events.gateway';
import { UsersModule } from '../users/users.module';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
    forwardRef(() => NotificationModule),
  ],
  controllers: [TaskController],
  providers: [TaskService, EventsGateway],
  exports: [
    TaskService,
    TypeOrmModule.forFeature([Task]), 
  ],
})
export class TaskModule {}