/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CalendarTask } from '../schemas/calendartask.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(CalendarTask.name)
    private readonly taskModel: Model<CalendarTask>,
  ) {}

  async getTasksInRange(viewMode: string, from: string, to: string): Promise<CalendarTask[]> {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      throw new BadRequestException('Invalid date range');
    }

    const tasks = await this.taskModel
      .find({
        startDate: { $gte: fromDate },
        dueDate: { $lte: toDate },
      })
      .populate('calendarUser', 'id name')
      .sort({ startDate: 1 })
      .exec();

    return tasks;
  }

  async createTask(dto: CreateTaskDto): Promise<CalendarTask> {
    try {
      const task = new this.taskModel({
        ...dto,
        status: 'To Do',
      });
      return await task.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(`Failed to create task: ${error.message}`);
      }
      throw new BadRequestException('Failed to create task');
    }
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<CalendarTask> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid task ID');
    }

    const updated = await this.taskModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    
    if (!updated) {
      throw new NotFoundException('Task not found');
    }
    return updated;
  }

  async deleteTask(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid task ID');
    }

    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Task not found');
    }
  }
}