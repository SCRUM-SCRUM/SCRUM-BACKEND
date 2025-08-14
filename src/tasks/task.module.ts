import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ColumnEntity } from '../columns/entities/column.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { WorkspaceSubtask } from 'src/workspace/entities/WorkspaceSubtask.entity';
import { TaskGateway } from './task.gateway';
import { Subtask, SubtaskService } from 'src/subtask/subtask.service';
import { SubtaskGateway } from 'src/subtask/subtask.gateway';
import { Comment } from '../comments/comment.entity';
import { CommentService } from '../comments/comment.service';
import { CommentController } from '../comments/comment.controller';
import { CommentGateway } from '../comments/comment.gateway';
import { CommentModule } from '../comments/comment.module'; 



@Module({
  imports: [TypeOrmModule.forFeature([Task, ColumnEntity, WorkspaceSubtask, SubtaskService, SubtaskGateway, Subtask,  Comment,  CommentModule, CommentService, CommentGateway])],
  controllers: [TaskController, CommentController],
  providers: [TaskService,  TaskGateway, SubtaskGateway, SubtaskService, CommentService, CommentGateway],
  exports: [TaskService, SubtaskService,CommentGateway, CommentService, TaskGateway],
})
export class TaskModule {}
