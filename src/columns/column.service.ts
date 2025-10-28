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

    // Get the highest order number for columns in this workspace
    const existingColumns = await this.columnModel
      .find({ workspace: workspace._id })
      .sort({ order: -1 })
      .limit(1)
      .exec();

    // Calculate the next order (horizontal addition - increment order)
    const nextOrder = existingColumns.length > 0 ? existingColumns[0].order + 1 : 0;

    // Create the column document
    const column = new this.columnModel({
      name: name as ColumnName,
      workspace: workspace._id,
      order: nextOrder,
      tasks: [],
    });

    // Save to DB
    const savedColumn = await column.save();

    // Broadcast real-time event
    this.columnGateway.broadcastColumnUpdate('column.created', savedColumn);

    return savedColumn;
  }

  async findByWorkspace(workspaceId: string): Promise<Column[]> {
    // Validate workspaceId
    if (!Types.ObjectId.isValid(workspaceId)) {
      throw new BadRequestException(`Invalid workspace ID format: ${workspaceId}`);
    }

    // Check if workspace exists
    const workspace = await this.workspaceModel.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${workspaceId} not found`);
    }

    // Get all columns for this workspace, ordered horizontally (by order field)
    return this.columnModel
      .find({ workspace: workspace._id })
      .sort({ order: 1 }) // Sort by order ascending (0, 1, 2, 3...)
      .populate('tasks')
      .exec();
  }
}
