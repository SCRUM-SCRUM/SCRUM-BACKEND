/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Column, ColumnName } from './schemas/column.schema';
import { Workspace } from '../workspace/workspace.schema';
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
    // Validate workspaceId
    if (!Types.ObjectId.isValid(workspaceId)) {
      throw new BadRequestException(`Invalid workspace ID format: ${workspaceId}`);
    }

    // Check if workspace exists
    const workspace = await this.workspaceModel.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${workspaceId} not found`);
    }

    // Validate column name
    if (!Object.values(ColumnName).includes(name as ColumnName)) {
      throw new BadRequestException(`Invalid column name: ${name}`);
    }

    // Create the column document
    const column = new this.columnModel({
      name: name as ColumnName,
      workspace: workspace._id,
      order: 0,
      tasks: [],
    });

    // Save to DB
    const savedColumn = await column.save();

    // Broadcast real-time event
    this.columnGateway.broadcastColumnUpdate('column.created', savedColumn);

    return savedColumn;
  }
}
