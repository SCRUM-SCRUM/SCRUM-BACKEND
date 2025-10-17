/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(data: Partial<Task>) {
    const task = new this.taskModel(data);
    return task.save();
  }

  async findAll() {
    return this.taskModel.find().populate('projectId assignedTo').exec();
  }

  async findByProject(projectId: string) {
    return this.taskModel.find({ projectId }).populate('assignedTo').exec();
  }

  async updateStatus(id: string, status: string) {
    return this.taskModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async delete(id: string) {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  async countByStatus(status: string): Promise<number> {
  return this.taskModel.countDocuments({ status });
}
}
