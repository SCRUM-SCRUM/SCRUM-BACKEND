/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { ColumnService } from './column.service';
import { UpdateColumnDto } from './dto/update-column.dto';

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
  
  @Put(':columnId')
  update(@Param('columnId') columnId: string, @Body() dto: UpdateColumnDto) {
    return this.columnService.update(columnId, dto);
  }

  @Delete(':columnId')
  remove(@Param('columnId') columnId: string) {
    return this.columnService.remove(columnId);
  }
}
