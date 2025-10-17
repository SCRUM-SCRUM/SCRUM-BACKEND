/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Column, ColumnSchema } from './schemas/column.schema';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { ColumnGateway } from './column.gateway';
import { Workspace, WorkspaceSchema } from '../workspace/workspace.schema';
import { Task, TaskSchema } from '../tasks/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Column.name, schema: ColumnSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnGateway],
  exports: [ColumnService],
})
export class ColumnModule {}
