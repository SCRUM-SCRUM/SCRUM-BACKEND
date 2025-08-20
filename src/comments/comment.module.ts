import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/user.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentGateway } from './comment.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Task, User])],
  providers: [CommentService, CommentGateway],
  controllers: [CommentController],
  exports: [CommentService, CommentGateway],
})
export class CommentModule {}
