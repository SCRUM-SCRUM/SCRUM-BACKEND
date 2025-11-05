/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
    @Param('taskId') taskId: string,
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
    @Param('id') id: string,
    @Body() dto: UpdateSubtaskDto,
  ) {
    return this.subtaskService.update(id, dto);
  }

  @Delete('subtasks/:id')
  deleteSubtask(@Param('id') id: string) {
    return this.subtaskService.remove(id);
  }

@Post()
createTask(@Body() createTaskDto) {
  return this.taskService.create(createTaskDto);
}

@Get()
getTasks() {
  return this.taskService.findAll();
}

@Get(':id')
getTask(@Param('id') id: string) {
  return this.taskService.findOne(id);
}

@Put(':id')
updateTask(@Param('id') id: string, @Body() updateTaskDto) {
  return this.taskService.update(id, updateTaskDto);
}

@Delete(':id')
deleteTask(@Param('id') id: string) {
  return this.taskService.remove(id);
}

}


