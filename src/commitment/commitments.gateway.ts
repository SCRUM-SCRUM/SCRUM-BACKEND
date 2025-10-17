/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class CommitmentsGateway {
  @WebSocketServer()
  server: Server;

  // ✅ Typed client socket
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoin(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string }) {
    await client.join(data.roomId);
    this.server.to(data.roomId).emit('joined', { clientId: client.id });
  }

  broadcast(event: string, payload: unknown): void {
    this.server.emit(event, payload);
  }
}
