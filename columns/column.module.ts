import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { Workspace } from '@/workspace/entities/workspace.entity';
import { WorkspaceSubtask } from 'src/workspace/entities/WorkspaceSubtask.entity';
import { ColumnGateway } from './column.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity, Workspace, WorkspaceSubtask])],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnGateway],
  exports: [ColumnService],
})
export class ColumnModule {}
