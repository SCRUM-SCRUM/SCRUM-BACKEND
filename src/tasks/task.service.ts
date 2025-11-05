/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
  ) {}

  async create(dto: CreateTaskDto) {
    const task = new this.taskModel({
      ...dto,
      status: dto.status ?? 'Pending',
    });
    return task.save();
  }

  async findAll() {
    return this.taskModel.find().exec();
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    const updated = await this.taskModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException(`Task with ID ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Task with ID ${id} not found`);
    return deleted;
  }

  async countByStatus(status: string) {
    return this.taskModel.countDocuments({ status }).exec();
  }
}
