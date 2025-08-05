import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Get()
  findByWorkspace(@Query('workspaceId') workspaceId: string) {
    return this.taskService.findByWorkspace(workspaceId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(id, dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Get('kanban')
  getKanban(@Query('workspaceId') workspaceId: string) {
    return this.taskService.getKanbanView(workspaceId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') taskId: string,
    @Body('statusColumnId') statusColumnId: string,
  ) {
    if (!statusColumnId) {
      throw new BadRequestException('statusColumnId is required');
    }

    return this.taskService.updateStatus(taskId, statusColumnId);
  }
}
