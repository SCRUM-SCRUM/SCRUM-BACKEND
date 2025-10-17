/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { Workspace, WorkspaceSchema } from '@/workspace/schemas/workspace.schema';
import { WorkspaceSubtask, WorkspaceSubtaskSchema } from 'src/workspace/schemas/WorkspaceSubtask.schema';
import { ColumnGateway } from './column.gateway';
import { Column, ColumnSchema } from '@/columns/schemas/column.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Column.name, schema: ColumnSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: WorkspaceSubtask.name, schema: WorkspaceSubtaskSchema },
    ]),
  ],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnGateway],
  exports: [ColumnService],
})
export class ColumnModule {}

MongooseModule.forFeature([
  { name: Column.name, schema: ColumnSchema },
  { name: Workspace.name, schema: WorkspaceSchema },
])
