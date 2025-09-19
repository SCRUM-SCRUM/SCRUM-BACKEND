import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: true }, namespace: '/commitments' })
@Injectable()
export class CommitmentsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(CommitmentsGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Commitments WebSocket gateway initialized');
  }

  handleConnection(client: any) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Convenience method used by service/controller to broadcast
  broadcast(event: string, payload: any) {
    // Emit to all clients connected to this namespace
    this.server.emit(event, payload);
  }
}