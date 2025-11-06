/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body,Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('tasks/:taskId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  addComment(
    @Param('taskId') taskId: string,
    @Body() body: { content: string; userId: string },
  ) {
    return this.commentService.addComment(taskId, body.userId, body.content);
  }

  @Put(':commentId')
  editComment(
    @Param('commentId') commentId: string,
    @Body() body: { content: string; userId: string }, // Add userId to body
  ) {
    return this.commentService.editComment(commentId, body.content, body.userId); // Pass userId, not taskId
  }

  @Delete(':commentId')
  deleteComment(
    @Param('commentId') commentId: string,
    @Body() body: { userId: string }, // Add userId to body for delete
  ) {
    return this.commentService.deleteComment(commentId, body.userId); // Pass userId, not taskId
  }

  @Get()
  getComments(@Param('taskId') taskId: string) {
    return this.commentService.getComments(taskId);
  }
}