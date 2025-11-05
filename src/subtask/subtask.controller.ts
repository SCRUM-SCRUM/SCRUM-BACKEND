/* eslint-disable prettier/prettier */
// src/subtasks/subtask.controller.ts
import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Controller('subtasks')
export class SubtaskController {
  constructor(private readonly subtaskService: SubtaskService) {}

  @Post()
  create(@Body() dto: CreateSubtaskDto) {
    return this.subtaskService.create(dto);
  }

  @Get()
  findAll() {
    return this.subtaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtaskService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubtaskDto) {
    return this.subtaskService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtaskService.remove(id);
  }
}
