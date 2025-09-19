<<<<<<< HEAD
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CommentService } from './comment.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly commentService: CommentService) {}

  @SubscribeMessage('addComment')
  async handleAddComment(@MessageBody() payload: { taskId: string; content: string; userId: string }) {
    const comment = await this.commentService.addComment(payload.taskId, payload.content, payload.userId);
    this.server.emit(`task:${payload.taskId}:commentAdded`, comment);
    return comment;
  }

   @SubscribeMessage('editComment')
  async handleEditComment(
    @MessageBody() payload: { commentId: string; content: string },
  ) {
    const comment = await this.commentService.editComment(payload.commentId, payload.content);
    this.server.emit(`task:${comment.task.id}:commentUpdated`, comment);
    return comment;
  }

  @SubscribeMessage('deleteComment')
  async handleDeleteComment(
    @MessageBody() payload: { commentId: string },
  ) {
    const deleted = await this.commentService.deleteComment(payload.commentId);
    if (deleted.taskId) {
      this.server.emit(`task:${deleted.taskId}:commentDeleted`, { commentId: payload.commentId });
    }
    return deleted;
  }
}
=======
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CommentService } from './comment.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly commentService: CommentService) {}

  @SubscribeMessage('addComment')
  async handleAddComment(@MessageBody() payload: { taskId: string; content: string; userId: string }) {
    const comment = await this.commentService.addComment(payload.taskId, payload.content, payload.userId);
    this.server.emit(`task:${payload.taskId}:commentAdded`, comment);
    return comment;
  }

   @SubscribeMessage('editComment')
  async handleEditComment(
    @MessageBody() payload: { commentId: string; content: string },
  ) {
    const comment = await this.commentService.editComment(payload.commentId, payload.content);
    this.server.emit(`task:${comment.task.id}:commentUpdated`, comment);
    return comment;
  }

  @SubscribeMessage('deleteComment')
  async handleDeleteComment(
    @MessageBody() payload: { commentId: string },
  ) {
    const deleted = await this.commentService.deleteComment(payload.commentId);
    if (deleted.taskId) {
      this.server.emit(`task:${deleted.taskId}:commentDeleted`, { commentId: payload.commentId });
    }
    return deleted;
  }
}
>>>>>>> master
