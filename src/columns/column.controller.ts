import { Controller, Post, Body, Param } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnEntity } from './entities/column.entity';

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post(':workspaceId')
  create(@Param('workspaceId') workspaceId: number, @Body('name') name: string): Promise<ColumnEntity> {
    return this.columnService.create(workspaceId, name);
  }
} 