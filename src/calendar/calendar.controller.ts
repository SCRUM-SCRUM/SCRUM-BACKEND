import { Controller, Get, Post, Patch, Delete, Body, Query, Param, BadRequestException } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskGateway } from './calendar.gateway';

@Controller('calendar')
export class CalendarController {
   constructor(
    private readonly calendarService: CalendarService,
    private readonly taskGateway: TaskGateway
  ) {}

  @Get('tasks')
  getTasks(@Query() query: { viewMode: string; from: string; to: string }) {
    return this.calendarService.getTasksInRange(query.viewMode, query.from, query.to);
  }

  @Post('tasks')
   async createTask(@Body() dto: CreateTaskDto) {
    if (dto.dueDate && new Date(dto.dueDate) < new Date()) {
      throw new BadRequestException('Due date cannot be in the past');
    }
    const task = await this.calendarService.createTask(dto);
    this.taskGateway.broadcastTaskUpdate(task);
    return task;
  }


  @Patch('tasks/:id')
    async updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    if (dto.dueDate && new Date(dto.dueDate) < new Date()) {
      throw new BadRequestException('Due date cannot be in the past');
    }
    const updated = await this.calendarService.updateTask(id, dto);
    if (updated) {
      this.taskGateway.broadcastTaskUpdate(updated);
    }
    return updated;
  }

   @Delete('tasks/:id')
  async deleteTask(@Param('id') id: string) {
    await this.calendarService.deleteTask(id);
    this.taskGateway.broadcastTaskDeletion(id);
    return { success: true };
  }
}

