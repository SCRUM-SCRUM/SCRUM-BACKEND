/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.schema'; // Assuming Project schema is defined here

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() data: Partial<Project>) {
    return this.projectService.create(data);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('workspace/:workspaceId')
  findByWorkspace(@Param('workspaceId') workspaceId: string) {
    return this.projectService.findByWorkspace(workspaceId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Project>) {
    return this.projectService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}