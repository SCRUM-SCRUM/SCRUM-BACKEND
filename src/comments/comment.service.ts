import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Task } from '../tasks/entities/task.entity';
import { CommentGateway } from './comment.gateway';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
   ) {}

  async addComment(taskId: string, content: string, userId: string) {
    const task = await this.taskRepo.findOne({ where: { id: Number(taskId) } });
    if (!task) throw new NotFoundException('Task not found');

    const comment = this.commentRepo.create({
      content,
      task,
      user: { id: userId } as any,
    });
    const savedComment = await this.commentRepo.save(comment);

    return this.commentRepo.save(comment);
  }

   async editComment(commentId: string, content: string) {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['task'],
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return this.commentRepo.save(comment);
  }

  async deleteComment(commentId: string) {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['task'],
    });
    if (!comment) throw new NotFoundException('Comment not found');

    const taskId = comment.task.id;
    await this.commentRepo.remove(comment);
    return { taskId };
  }


  async getComments(taskId: string) { 
    const task = await this.taskRepo.findOne({ where: { id: Number(taskId) } });
    if (!task) throw new NotFoundException('Task not found');
    return this.commentRepo.find({
      where: { task: { id: Number(taskId) } },
      relations: ['user'],
      order: { createdAt: 'ASC' },
    
    });
  }
}
