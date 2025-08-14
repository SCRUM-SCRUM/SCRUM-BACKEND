import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { ColumnEntity } from '../columns/entities/column.entity';
import { Task } from '../tasks/entities/task.entity';
import { WorkspaceGateway } from './workspace.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, ColumnEntity, Task])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceGateway],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}

