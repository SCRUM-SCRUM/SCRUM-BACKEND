<<<<<<< HEAD
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WorkspaceGateway {
  @WebSocketServer()
  server: Server;

  broadcastWorkspaceupdate(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
=======
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WorkspaceGateway {
  @WebSocketServer()
  server: Server;

  broadcastWorkspaceupdate(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
>>>>>>> master
