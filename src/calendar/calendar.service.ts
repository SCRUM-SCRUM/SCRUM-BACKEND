import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CalendarTask } from '../entities/calendartask.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarTask)
    private taskRepo: Repository<CalendarTask>
  ) {}

  async getTasksInRange(viewMode: string, from: string, to: string) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    throw new Error('Invalid date range');
  }

  const tasks: CalendarTask[] = await this.taskRepo.createQueryBuilder('calendarTask')
    .where('calendarTask.startDate >= :fromDate', { fromDate })
    .andWhere('calendarTask.dueDate <= :toDate', { toDate })
    // .andWhere('calendarTask.status = :status', { status: 'In Progress' }) 
    .leftJoinAndSelect('calendarTask.calendarUser', 'user').select(['user.id', 'user.name'])
    .getMany();

    tasks.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  return tasks;
}

  async createTask(dto: CreateTaskDto) {
    const task = this.taskRepo.create({
      ...dto,
      status: 'To Do',
    });
    return this.taskRepo.save(task);
  }

  async updateTask(id: string, dto: UpdateTaskDto) {
    await this.taskRepo.update(id, dto);
    return this.taskRepo.findOne({ where: { id } });
  }

  async deleteTask(id: string) {
    await this.taskRepo.delete(id);
  }
}

