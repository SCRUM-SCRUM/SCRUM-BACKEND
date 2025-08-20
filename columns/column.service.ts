import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity, ColumnName } from './entities/column.entity';
import { Repository } from 'typeorm';
import { Workspace } from '@/workspace/entities/workspace.entity';
import { ColumnGateway } from './column.gateway';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepo: Repository<ColumnEntity>,
    
    @InjectRepository(Workspace)
    private readonly workspaceRepo: Repository<Workspace>,
    private readonly columnGateway: ColumnGateway,
  ) {}

  async create(workspaceId: number, name: string): Promise<ColumnEntity> {
    const workspace = await this.workspaceRepo.findOneBy({ id: workspaceId });

    if (!workspace) {
      throw new Error(`Workspace with ID ${workspaceId} not found`);
    }

    if (!Object.values(ColumnName).includes(name as ColumnName)) {
      throw new Error(`Invalid column name: ${name}`);
    }

    const column = this.columnRepo.create({
      name: name as ColumnName,
      workspace,
      order: 0,
      tasks: [],
    });
    this.columnGateway.broadcastColumnUpdate('column.created', column);

    return this.columnRepo.save(column);
  }
}
