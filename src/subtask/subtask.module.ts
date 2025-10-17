/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Subtask, SubtaskSchema } from './schemas/subtask.schema';
import { Task, TaskSchema } from '../tasks/task.schema'; 
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { SubtaskGateway } from './subtask.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subtask.name, schema: SubtaskSchema }, { name: Task.name, schema: TaskSchema }])],
  controllers: [SubtaskController],
  providers: [SubtaskService, SubtaskGateway],
  exports: [SubtaskService],
})
export class SubtaskModule {}