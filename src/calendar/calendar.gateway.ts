<<<<<<< HEAD
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CalendarTask } from '../entities/calendartask.entity';

@WebSocketGateway({ namespace: '/calendar' })
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  broadcastTaskUpdate(task: CalendarTask) {
    this.server.emit('taskUpdated', task);
  }

  broadcastTaskDeletion(taskId: string) {
    this.server.emit('taskDeleted', { id: taskId });
  }
=======
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CalendarTask } from '../entities/calendartask.entity';

@WebSocketGateway({ namespace: '/calendar' })
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  broadcastTaskUpdate(task: CalendarTask) {
    this.server.emit('taskUpdated', task);
  }

  broadcastTaskDeletion(taskId: string) {
    this.server.emit('taskDeleted', { id: taskId });
  }
>>>>>>> master
}