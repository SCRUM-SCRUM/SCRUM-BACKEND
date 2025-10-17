/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column, ColumnName } from './schemas/column.schema';
import { Workspace } from '@/workspace/schemas/workspace.schema';
import { ColumnGateway } from './column.gateway';

@Injectable()
export class ColumnService {
  constructor(
    @InjectModel(Column.name)
    private readonly columnModel: Model<Column>,

    @InjectModel(Workspace.name)
    private readonly workspaceModel: Model<Workspace>,

    private readonly columnGateway: ColumnGateway,
  ) {}

  async create(workspaceId: string, name: string): Promise<Column> {
    // Check if workspace exists
    const workspace = await this.workspaceModel.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${workspaceId} not found`);
    }

    // Validate column name
    if (!Object.values(ColumnName).includes(name as ColumnName)) {
      throw new BadRequestException(`Invalid column name: ${name}`);
    }

    // Create new column document
    const column = new this.columnModel({
      name: name as ColumnName,
      workspace: workspace._id,
      order: 0,
      tasks: [],
    });

    await column.save();

    // Broadcast event via WebSocket
    this.columnGateway.broadcastColumnUpdate('column.created', column);

    return column;
  }
}
