// src/tasks/task.gateway.ts
import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {MessageBody} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  broadcastTaskUpdate(event: string, payload: any) {
    this.server.emit(event, payload);
  } 
}

