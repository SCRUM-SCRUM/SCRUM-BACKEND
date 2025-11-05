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
  async update(@Param('columnId') columnId: string, @Body() dto: UpdateColumnDto) {
    const updatedColumn = await this.columnService.update(columnId, dto);

    return {
      message: 'Column updated successfully',
      data: updatedColumn,
    };
  }

  @Delete(':columnId')
  async remove(@Param('columnId') columnId: string) {
    const deletedColumn = await this.columnService.remove(columnId);

    return {
      message: 'Column deleted successfully',
      data: deletedColumn, // ✅ full deleted document
    };
  }
}
