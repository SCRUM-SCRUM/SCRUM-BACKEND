import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { ColumnEntity } from '../columns/entities/column.entity';
import { WorkspaceGateway } from './workspace.gateway';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepo: Repository<Workspace>,
    @InjectRepository(ColumnEntity)
    private readonly columnRepo: Repository<ColumnEntity>,
     private workspaceGateway: WorkspaceGateway,
  ) {}

  create(name: string): Promise<Workspace> {
    const workspace = this.workspaceRepo.create({ name });
    workspace.columns = [];
    workspace.tasks = [];
    this.workspaceGateway.broadcastWorkspaceupdate('workspace.created', workspace);
    return this.workspaceRepo.save(workspace);
  }

  // In workspace.service.ts
async countActiveWorkspaces(): Promise<number> {
  return this.workspaceRepo.count({ 
    where: { /* your active workspace criteria */ } 
  });
}

async countAllWorkspaces(): Promise<number> {
  return this.workspaceRepo.count();
}

  async findOne(id: number): Promise<Workspace> {
    const workspace = await this.workspaceRepo.findOne({ where: { id }, relations: ['columns', 'columns.tasks'] });
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    this.workspaceGateway.broadcastWorkspaceupdate('workspace.found', workspace);
    return workspace;
  }

  async getBoardLayout(id: number) {
    const workspace = await this.workspaceRepo.findOne({
      where: { id },
      relations: ['columns', 'columns.tasks'],
      order: {
        columns: {
          order: 'ASC',
        },
      },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    this.workspaceGateway.broadcastWorkspaceupdate('workspace.layout', workspace);

    return workspace;
  }
}
