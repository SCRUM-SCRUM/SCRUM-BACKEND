/* eslint-disable prettier/prettier */
// database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './tasks/schemas/task.schema';
import { User, UserSchema } from '../user/user.schema';
// Import other commonly used schemas

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
      // Add other commonly used models here
    ]),
  ],
  exports: [MongooseModule], // Export to make all models available
})
export class DatabaseModule {}