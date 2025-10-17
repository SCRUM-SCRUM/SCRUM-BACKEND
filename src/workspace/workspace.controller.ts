/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async create(@Body() data: CreateWorkspaceDto) {
    return await this.workspaceService.create(data);
  }

  @Get()
  async findAll() {
    return await this.workspaceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workspaceService.findById(id);
  }

  @Put(':id/members/:userId')
  async addMember(@Param('id') workspaceId: string, @Param('userId') userId: string) {
    return await this.workspaceService.addMember(workspaceId, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.workspaceService.delete(id);
  }
}
