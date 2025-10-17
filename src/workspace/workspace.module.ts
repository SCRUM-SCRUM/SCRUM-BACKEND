/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, WorkspaceSchema } from './workspace.schema';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { Column, ColumnSchema } from '../columns/schemas/column.schema';
import { Task, TaskSchema } from '../tasks/schemas/task.schema';
import { WorkspaceGateway } from './workspace.gateway';
import { WorkspaceTask, WorkspaceTaskSchema } from './schemas/workspacetask.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: Column.name, schema: ColumnSchema },
      { name: Task.name, schema: TaskSchema },
      { name: WorkspaceTask.name, schema: WorkspaceTaskSchema },
    ]),
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceGateway],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
