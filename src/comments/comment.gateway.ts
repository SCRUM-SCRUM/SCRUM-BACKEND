/* eslint-disable prettier/prettier */
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

  // ✅ Add comment
  @SubscribeMessage('addComment')
  async handleAddComment(
    @MessageBody() payload: { taskId: string; userId: string; content: string },
  ) {
    const comment = await this.commentService.addComment(
      payload.taskId,
      payload.userId,
      payload.content,
    );

    // Broadcast new comment to task room
    this.server.emit(`task:${payload.taskId}:commentAdded`, comment);
    return comment;
  }

  // ✅ Edit comment
  @SubscribeMessage('editComment')
  async handleEditComment(
    @MessageBody() payload: { commentId: string; userId: string; content: string },
  ) {
    const updatedComment = await this.commentService.editComment(
      payload.commentId,
      payload.userId,
      payload.content,
    );

    // Use taskId since there's no 'task' field in schema
    if (updatedComment.taskId) {
      this.server.emit(
        `task:${updatedComment.taskId.toString()}:commentUpdated`,
        updatedComment,
      );
    }

    return updatedComment;
  }

  // ✅ Delete comment
  @SubscribeMessage('deleteComment')
  async handleDeleteComment(
    @MessageBody() payload: { commentId: string; taskId: string },
  ) {
    await this.commentService.deleteComment(payload.commentId, payload.taskId);

    if (payload.taskId) {
      this.server.emit(`task:${payload.taskId}:commentDeleted`, {
        commentId: payload.commentId,
      });
    }

    return { message: 'Comment deleted successfully' };
  }
}
