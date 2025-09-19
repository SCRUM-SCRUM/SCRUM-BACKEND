<<<<<<< HEAD
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../columns/entities/column.entity';
import { TaskGateway } from './task.gateway';

@Injectable()
export class TaskService {
  ws: any;
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
     private taskGateway: TaskGateway,
  ) {}

  async create(columnId: number, data: Partial<Task>): Promise<Task> {
    const column = await this.columnRepository.findOneBy({ id: columnId });
    if (!column) throw new NotFoundException('Column not found');
    const task = this.taskRepository.create({ ...data, column });
     const saved = await this.taskRepository.save(task);
     this.taskGateway.broadcastTaskUpdate('task.created', saved);
  return saved;
  }

  async moveTask(taskId: number, targetColumnId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId }, relations: ['column'] });
    const column = await this.columnRepository.findOneBy({ id: targetColumnId });
    if (!task || !column) throw new NotFoundException();
    task.column = column;
     const moved = await this.taskRepository.save(task);
     this.taskGateway.broadcastTaskUpdate('task.moved', moved);
    return moved;
  }

  async update(taskId: number, data: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) throw new NotFoundException();
    Object.assign(task, data);
    const updated = await this.taskRepository.save(task);
    this.taskGateway.broadcastTaskUpdate('task.updated', updated);
    return updated;
  }

  async softDelete(taskId: number): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) throw new NotFoundException();
    task.isDeleted = true;
    await this.taskRepository.save(task);
     this.taskGateway.broadcastTaskUpdate('task.deleted', { id: taskId });
  }

async countByStatus(status: string): Promise<number> {
  return this.taskRepository.count({
    where: { status: status as any, isDeleted: false }, // cast status to the correct enum type
  });
}

}



=======
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ColumnEntity } from '../columns/entities/column.entity';
import { TaskGateway } from './task.gateway';

@Injectable()
export class TaskService {
  ws: any;
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
     private taskGateway: TaskGateway,
  ) {}

  async create(columnId: number, data: Partial<Task>): Promise<Task> {
    const column = await this.columnRepository.findOneBy({ id: columnId });
    if (!column) throw new NotFoundException('Column not found');
    const task = this.taskRepository.create({ ...data, column });
     const saved = await this.taskRepository.save(task);
     this.taskGateway.broadcastTaskUpdate('task.created', saved);
  return saved;
  }

  async moveTask(taskId: number, targetColumnId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId }, relations: ['column'] });
    const column = await this.columnRepository.findOneBy({ id: targetColumnId });
    if (!task || !column) throw new NotFoundException();
    task.column = column;
     const moved = await this.taskRepository.save(task);
     this.taskGateway.broadcastTaskUpdate('task.moved', moved);
    return moved;
  }

  async update(taskId: number, data: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) throw new NotFoundException();
    Object.assign(task, data);
    const updated = await this.taskRepository.save(task);
    this.taskGateway.broadcastTaskUpdate('task.updated', updated);
    return updated;
  }

  async softDelete(taskId: number): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) throw new NotFoundException();
    task.isDeleted = true;
    await this.taskRepository.save(task);
     this.taskGateway.broadcastTaskUpdate('task.deleted', { id: taskId });
  }

async countByStatus(status: string): Promise<number> {
  return this.taskRepository.count({
    where: { status: status as any, isDeleted: false }, // cast status to the correct enum type
  });
}

}



>>>>>>> master
