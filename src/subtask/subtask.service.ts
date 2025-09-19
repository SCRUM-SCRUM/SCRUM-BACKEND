<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from './entities/subtask.entity';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { Task } from '../tasks/entities/task.entity';
import { SubtaskGateway } from './subtask.gateway';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private subtaskGateway: SubtaskGateway,
     @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>
  ) {}

  async create(dto: CreateSubtaskDto): Promise<Subtask> {
    const task = await this.taskRepository.findOneBy({ id: dto.taskId });
    if (!task) throw new Error('Task not found');
    const subtask = this.subtaskRepository.create({ title: dto.title, task });
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.created', subtask);
    return this.subtaskRepository.save(subtask);
  }

  findAll(): Promise<Subtask[]> {
    return this.subtaskRepository.find({ relations: ['task'] });
  }

  async findOne(id: number): Promise<Subtask> {
    const subtask = await this.subtaskRepository.findOne({ where: { id }, relations: ['task'] });
    if (!subtask) {
      throw new Error('Subtask not found');

    }
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.found', subtask);
    return subtask;
  }

  async update(id: number, dto: UpdateSubtaskDto): Promise<Subtask> {
    await this.subtaskRepository.update(id, dto);
    const updatedSubtask = await this.subtaskRepository.findOne({ where: { id }, relations: ['task'] });
    if (!updatedSubtask) {
        throw new Error('Subtask not found');
    }
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.updated', updatedSubtask);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.subtaskRepository.delete(id);
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.deleted', { id });
  }

  async findAllForTask(taskId: number): Promise<Subtask[]> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
        throw new Error('Task not found');
    }
    this.subtaskGateway.broadcastSubtaskUpdate('subtasks.foundForTask', { taskId });
    return this.subtaskRepository.find({
    where: { task: { id: taskId } },
    relations: ['task'],
    
  });
}


}


export { Subtask };

=======
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from './entities/subtask.entity';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { Task } from '../tasks/entities/task.entity';
import { SubtaskGateway } from './subtask.gateway';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private subtaskGateway: SubtaskGateway,
     @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>
  ) {}

  async create(dto: CreateSubtaskDto): Promise<Subtask> {
    const task = await this.taskRepository.findOneBy({ id: dto.taskId });
    if (!task) throw new Error('Task not found');
    const subtask = this.subtaskRepository.create({ title: dto.title, task });
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.created', subtask);
    return this.subtaskRepository.save(subtask);
  }

  findAll(): Promise<Subtask[]> {
    return this.subtaskRepository.find({ relations: ['task'] });
  }

  async findOne(id: number): Promise<Subtask> {
    const subtask = await this.subtaskRepository.findOne({ where: { id }, relations: ['task'] });
    if (!subtask) {
      throw new Error('Subtask not found');

    }
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.found', subtask);
    return subtask;
  }

  async update(id: number, dto: UpdateSubtaskDto): Promise<Subtask> {
    await this.subtaskRepository.update(id, dto);
    const updatedSubtask = await this.subtaskRepository.findOne({ where: { id }, relations: ['task'] });
    if (!updatedSubtask) {
        throw new Error('Subtask not found');
    }
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.updated', updatedSubtask);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.subtaskRepository.delete(id);
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.deleted', { id });
  }

  async findAllForTask(taskId: number): Promise<Subtask[]> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
        throw new Error('Task not found');
    }
    this.subtaskGateway.broadcastSubtaskUpdate('subtasks.foundForTask', { taskId });
    return this.subtaskRepository.find({
    where: { task: { id: taskId } },
    relations: ['task'],
    
  });
}


}


export { Subtask };

>>>>>>> master
