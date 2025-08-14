import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ColumnGateway {
  @WebSocketServer() server: Server;

  broadcastColumnUpdate(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
