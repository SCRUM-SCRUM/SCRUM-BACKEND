import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationCleanup } from './notification.cleanup';
import { TaskModule } from '../tasks/task.module';
import { User } from '../users/user.entity';
import { Task } from '@/tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User, Task]),
    //forwardRef(() => TaskModule),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationCleanup],
  exports: [NotificationService],
})
export class NotificationModule {}