/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subtask, SubtaskDocument } from './schemas/subtask.schema';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { Task } from '../tasks/task.schema';
import { SubtaskGateway } from './subtask.gateway';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<SubtaskDocument>,
    private subtaskGateway: SubtaskGateway,
    @InjectModel(Subtask.name) private readonly subtaskModel: Model<SubtaskDocument>,
  ) {}

  async create(dto: CreateSubtaskDto): Promise<SubtaskDocument> {
    const task = await this.taskModel.findById(dto.taskId).exec();
    if (!task) throw new Error('Task not found');
    const subtask = new this.subtaskModel({ title: dto.title, task });
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.created', subtask);
    return subtask.save();
  }

  findAll(): Promise<SubtaskDocument[]> {
    return this.subtaskModel.find().populate('task').exec();
  }

  async findOne(id: number): Promise<SubtaskDocument> {
    const subtask = await this.subtaskModel.findOne({ _id: id }).populate('task').exec();
    if (!subtask) {
      throw new Error('Subtask not found');
    }
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.found', subtask);
    return subtask;
  }

  async update(id: number, dto: UpdateSubtaskDto): Promise<SubtaskDocument> {
    const updatedSubtask = await this.subtaskModel.findOneAndUpdate({ _id: id }, dto, { new: true, runValidators: true }).populate('task').exec();
    if (!updatedSubtask) {
      throw new Error('Subtask not found');
    }
    this.subtaskGateway.broadcastSubtaskUpdate('subtask.updated', updatedSubtask);
    return updatedSubtask;
  }

  async remove(id: number): Promise<void> {
    const result = await this.subtaskModel.findByIdAndDelete(id).exec();
    if (result) {
      this.subtaskGateway.broadcastSubtaskUpdate('subtask.deleted', { id });
    }
  }

  async findAllForTask(taskId: string): Promise<SubtaskDocument[]> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new Error('Task not found');
    }
    this.subtaskGateway.broadcastSubtaskUpdate('subtasks.foundForTask', { taskId });
    return this.subtaskModel.find({ task: taskId }).populate('task').exec();
  }
}

export { SubtaskDocument as Subtask };