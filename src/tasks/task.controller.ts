/* eslint-disable prettier/prettier */
import { Controller, Post, Param, Body, Put, Delete, Get } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateSubtaskDto } from '../subtask/dto/create-subtask.dto';
import { UpdateSubtaskDto } from '../subtask/dto/update-subtask.dto';
import { SubtaskService } from '../subtask/subtask.service';


@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly subtaskService: SubtaskService,
  ) {}

  // ...existing task routes

  @Post(':taskId/subtasks')
  createSubtask(
    @Param('taskId') taskId: number,
    @Body() dto: CreateSubtaskDto,
  ) {
    return this.subtaskService.create({ ...dto, taskId });
  }

  @Get(':taskId/subtasks')
  getSubtasks(@Param('taskId') taskId: string) {
    return this.subtaskService.findAllForTask(taskId);
  }

  @Put('subtasks/:id')
  updateSubtask(
    @Param('id') id: number,
    @Body() dto: UpdateSubtaskDto,
  ) {
    return this.subtaskService.update(id, dto);
  }

  @Delete('subtasks/:id')
  deleteSubtask(@Param('id') id: number) {
    return this.subtaskService.remove(id);
  }
}


