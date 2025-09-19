import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './entities/subtask.entity';
import { Task } from '../tasks/entities/task.entity';
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { SubtaskGateway } from './subtask.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Subtask, Task])],
  controllers: [SubtaskController],
  providers: [SubtaskService, SubtaskGateway],
  exports: [SubtaskService],
})
export class SubtaskModule {}
