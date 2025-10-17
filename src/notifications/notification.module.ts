/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationCleanup } from './notification.cleanup';
import { TaskModule } from '../tasks/task.module';
import { Task, TaskSchema } from '../tasks/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
    forwardRef(() => TaskModule),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationCleanup],
  exports: [NotificationService],
})
export class NotificationModule {}
