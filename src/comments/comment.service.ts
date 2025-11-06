/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from './comment.schema';
import { Task } from '../tasks/task.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  // ✅ Create new comment
  async create(data: Partial<Comment>) {
    const comment = new this.commentModel(data);
    return comment.save();
  }

  // ✅ Add comment to a task
  async addComment(taskId: string, userId: string, content: string) {
    if (!Types.ObjectId.isValid(taskId)) {
      throw new BadRequestException('Invalid task ID format');
    }

    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new BadRequestException(`Task with ID ${taskId} not found`);
    }

    const comment = new this.commentModel({
      content,
      userId: new Types.ObjectId(userId),
      taskId: new Types.ObjectId(taskId),
      createdAt: new Date(),
    });

    const savedComment = await comment.save();

     if (!task.comments) {
    task.comments = [];
  }
  
    if (Array.isArray(task.comments)) {
      task.comments.push(savedComment._id as Types.ObjectId);
      await task.save();
    }

    return savedComment;
  }

  // ✅ Get all comments for a specific task
  async getComments(taskId: string) {
    return this.commentModel.find({ taskId }).populate('userId').exec();
  }

  // ✅ Edit a comment (update content)
  async editComment(commentId: string, newContent: string, userId: string) {
    if (!Types.ObjectId.isValid(commentId)) {
      throw new BadRequestException('Invalid comment ID format');
    }

    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Optional: Restrict editing to the comment's owner
    if (comment.userId.toString() !== userId.toString()) {
      throw new BadRequestException('You can only edit your own comments');
    }

    comment.content = newContent;
    comment.updatedAt = new Date();

    return comment.save();
  }

  // ✅ Delete a comment
  async deleteComment(commentId: string, userId: string) {
    if (!Types.ObjectId.isValid(commentId)) {
      throw new BadRequestException('Invalid comment ID format');
    }

    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Optional: Restrict deletion to the comment's owner
    if (comment.userId.toString() !== userId.toString()) {
      throw new BadRequestException('You can only delete your own comments');
    }

    // Remove comment reference from task.comments (if exists)
    await this.taskModel.updateOne(
      { _id: comment.taskId },
      { $pull: { comments: comment._id } }
    );

    await this.commentModel.findByIdAndDelete(commentId);

    return { message: 'Comment deleted successfully' };
  }
}
