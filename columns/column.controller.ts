/* eslint-disable prettier/prettier */
import { Controller, Post, Param, Body } from '@nestjs/common';
import { ColumnService } from './column.service';
import { Column } from './schemas/column.schema'; 

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post(':workspaceId')
  create(
    @Param('workspaceId') workspaceId: string, 
    @Body('name') name: string,
  ): Promise<Column> { 
    return this.columnService.create(workspaceId, name);
  }
}
