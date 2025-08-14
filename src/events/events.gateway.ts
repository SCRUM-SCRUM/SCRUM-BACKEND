import {WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  emitTaskUpdate(data: any) {
    this.server.emit('taskUpdated', data);
  }

  emitColumnUpdate(data: any) {
    this.server.emit('columnUpdated', data);
  }

  emitSubtaskUpdate(data: any) {
    this.server.emit('subtaskUpdated', data);
  }

  emitWorkspaceUpdate(data: any) {
    this.server.emit('workspaceUpdated', data);
  }

  // Optional listener for client pings
  @SubscribeMessage('ping')
  handlePing(@MessageBody() message: string): string {
    return `pong: ${message}`;
  }
}
