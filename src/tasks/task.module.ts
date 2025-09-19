import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ColumnEntity } from '../columns/entities/column.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { WorkspaceSubtask } from 'src/workspace/entities/WorkspaceSubtask.entity';
import { TaskGateway } from './task.gateway';
import { Comment } from '../comments/comment.entity';
import { CommentService } from '../comments/comment.service';
import { CommentController } from '../comments/comment.controller';
import { CommentGateway } from '../comments/comment.gateway';
import { CommentModule } from '../comments/comment.module';
import { SubtaskModule } from '@/subtask/subtask.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      ColumnEntity,
      WorkspaceSubtask,
      Comment,
    ]),
    CommentModule,
    SubtaskModule, // ✅ import instead of duplicating providers
  ],
  controllers: [TaskController, CommentController],
  providers: [
    TaskService,
    TaskGateway,
    CommentService,
    CommentGateway,
  ],
  exports: [
    TaskService,
    CommentService,
    CommentGateway,
    TaskGateway,
  ],
})
export class TaskModule {}
