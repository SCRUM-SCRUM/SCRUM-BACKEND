/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Controller('workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async create(@Req() req, @Body() data: CreateWorkspaceDto) {
    return this.workspaceService.create(data, req.user.userId);
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
  const deleted = await this.workspaceService.delete(id);

  if (!deleted) {
    return {
      success: false,
      message: "Workspace not found"
    };
  }

  return {
    success: true,
    message: "Workspace deleted successfully",
    workspaceId: id
  };
}
}
