import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('EventsGateway');

  constructor(private readonly configService: ConfigService) {}

  handleConnection(client: Socket) {
    const authHeader = client.handshake.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.warn(`Missing or invalid Authorization header from client ${client.id}`);
      client.disconnect();
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.verifyJwt(token);
      const userId = decoded.userId;

      if (!userId) throw new Error('Invalid token payload');

      client.join(`notifications:${userId}`);
      this.logger.log(`Client ${client.id} joined notifications:${userId}`);
    } catch (err) {
      this.logger.warn(`JWT verification failed for client ${client.id}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }

  emitToUser(userId: number, notification: any) {
    this.server.to(`notifications:${userId}`).emit('newNotification', notification);
  }

  sendTaskCreateToUser(userId: number, task: any) {
    this.server.to(`notifications:${userId}`).emit('taskCreated', task);
  }

  sendTaskUpdateToUser(userId: number, task: any) {
    this.server.to(`notifications:${userId}`).emit('taskUpdated', task);
  }

  private verifyJwt(token: string): any {
    const secret = this.configService.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET not defined in environment');
    }

    return jwt.verify(token, secret);
  }
}
