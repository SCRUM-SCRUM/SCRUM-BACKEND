<<<<<<< HEAD
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { Workspace } from './entities/workspace.entity';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(@Body('name') name: string): Promise<Workspace> {
    return this.workspaceService.create(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Workspace> {
    return this.workspaceService.findOne(id);
  }

  // Fetch all columns and tasks for a workspace in ordered layout
  @Get(':id/board')
  async getBoard(@Param('id') id: number) {
    return this.workspaceService.getBoardLayout(id);
  }
}
=======
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { Workspace } from './entities/workspace.entity';

@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  create(@Body('name') name: string): Promise<Workspace> {
    return this.workspaceService.create(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Workspace> {
    return this.workspaceService.findOne(id);
  }

  // Fetch all columns and tasks for a workspace in ordered layout
  @Get(':id/board')
  async getBoard(@Param('id') id: number) {
    return this.workspaceService.getBoardLayout(id);
  }
}
>>>>>>> master
 