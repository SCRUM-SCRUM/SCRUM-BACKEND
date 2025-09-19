<<<<<<< HEAD
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
    return this.commentService.addComment(taskId, body.content, body.userId);
  }

  @Put(':commentId')
  editComment(
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string,
    @Body() body: { content: string },
  ) {
    return this.commentService.editComment(commentId, body.content);
  }

   @Delete(':commentId')
  deleteComment(
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.deleteComment(commentId);
  }

  @Get()
  getComments(@Param('taskId') taskId: string) {
    return this.commentService.getComments(taskId);
  }
}
=======
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
    return this.commentService.addComment(taskId, body.content, body.userId);
  }

  @Put(':commentId')
  editComment(
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string,
    @Body() body: { content: string },
  ) {
    return this.commentService.editComment(commentId, body.content);
  }

   @Delete(':commentId')
  deleteComment(
    @Param('taskId') taskId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.deleteComment(commentId);
  }

  @Get()
  getComments(@Param('taskId') taskId: string) {
    return this.commentService.getComments(taskId);
  }
}
>>>>>>> master
