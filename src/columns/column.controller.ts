/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ColumnService } from './column.service';

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post(':workspaceId')
  async create(
    @Param('workspaceId') workspaceId: string,
    @Body('name') name: string,
  ) {
    const column = await this.columnService.create(workspaceId, name);

    return {
      message: 'Column created successfully',
      data: {
        _id: column._id,
        name: column.name,
        order: column.order,
        workspace: column.workspace,
        tasks: column.tasks,
      },
    };
  }

  @Get(':workspaceId')
  async findByWorkspace(@Param('workspaceId') workspaceId: string) {
    return this.columnService.findByWorkspace(workspaceId);
  }
}
