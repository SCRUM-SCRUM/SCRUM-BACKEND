import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { EventsGateway } from '../events/events.gateway';
import { NotificationService } from '../notifications/notification.service';
import { User } from '../users/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly notificationService: NotificationService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async countByStatus(status: string): Promise<number> {
    return this.taskRepo.count({
      where: { status: status as 'Todo' | 'In Progress' | 'Done' },
    });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepo.create(dto);
    const saved = await this.taskRepo.save(task);

    if (saved.assignedToUserId) {
      const user = await this.userRepo.findOneBy({ id: saved.assignedToUserId });

      if (user) {
        const notification = await this.notificationService.create(user, {
          type: 'assignment',
          message: `You've been assigned to task "${saved.title}"`,
          link: `/tasks/${saved.id}`,
        });

        this.eventsGateway.emitToUser(user.id, notification);
        this.eventsGateway.sendTaskCreateToUser(user.id, saved);
      }
    } else {
      this.eventsGateway.sendTaskCreate(saved);
    }

    return saved;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepo.find({
      order: { createdAt: 'DESC' },
      relations: ['assignedTo'],
    });
  }

  async findByWorkspace(workspaceId: string): Promise<Task[]> {
    return this.taskRepo.find({
      where: { workspaceId },
      relations: ['assignedTo'],
      order: { createdAt: 'DESC' },
    });
  }

  async getKanbanView(workspaceId: string): Promise<{ [status: string]: Task[] }> {
    const tasks = await this.findByWorkspace(workspaceId);
    return {
      'Todo': tasks.filter(task => task.status === 'Todo'),
      'In Progress': tasks.filter(task => task.status === 'In Progress'),
      'Done': tasks.filter(task => task.status === 'Done'),
    };
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['assignedTo'],
    });

    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepo.findOne({ 
      where: { id }, 
      relations: ['assignedTo'] 
    });

    if (!task) throw new NotFoundException('Task not found');

    if (dto.assignedToUserId && dto.assignedToUserId !== task.assignedTo?.id) {
      const assignedUser = await this.userRepo.findOneBy({ id: dto.assignedToUserId });

      if (assignedUser) {
        const notification = await this.notificationService.create(assignedUser, {
          type: 'assignment',
          message: `You've been assigned to task "${task.title}"`,
          link: `/tasks/${task.id}`,
        });

        this.eventsGateway.emitToUser(assignedUser.id, notification);
        this.eventsGateway.sendTaskUpdateToUser(assignedUser.id, task);
      }
    }

    Object.assign(task, dto);
    const saved = await this.taskRepo.save(task);

    if (saved.assignedToUserId) {
      this.eventsGateway.sendTaskUpdateToUser(saved.assignedToUserId, saved);
    } else {
      this.eventsGateway.sendTaskUpdate(saved);
    }

    return saved;
  }

  async updateStatus(taskId: string, statusColumnId: string): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');

    task.status = this.mapStatusColumnToStatus(statusColumnId);
    return this.taskRepo.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    await this.taskRepo.remove(task);
  }

  private mapStatusColumnToStatus(statusColumnId: string): 'Todo' | 'In Progress' | 'Done' {
    // Implement your actual column ID to status mapping here
    // This is just an example implementation
    const statusMap: Record<string, 'Todo' | 'In Progress' | 'Done'> = {
      'col_todo': 'Todo',
      'col_in_progress': 'In Progress',
      'col_done': 'Done',
    };

    return statusMap[statusColumnId] || 'Todo';
  }
}