/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Workspace } from './workspace.schema';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(@InjectModel(Workspace.name) private workspaceModel: Model<Workspace>) {}

  async create(dto: CreateWorkspaceDto, ownerId: string): Promise<Workspace> {
  const members = dto.members
    ? dto.members
        .filter(Boolean)
        .map((m) => (Types.ObjectId.isValid(String(m)) ? new Types.ObjectId(String(m)) : undefined))
        .filter((m): m is Types.ObjectId => !!m)
    : [];

   const payload: Partial<Workspace> = {
    name: dto.name,
    owner: new Types.ObjectId(ownerId),
    ...(dto.description ? { description: dto.description } : {}),
    ...(members.length ? { members } : {}),
  };

  const created = new this.workspaceModel(payload);
  return await created.save();
}
  
  async findAll() {
    return this.workspaceModel.find().populate('owner members').exec();
  }

  async findById(id: string) {
    return this.workspaceModel.findById(id).populate('owner members').exec();
  }

  async addMember(workspaceId: string, userId: string) {
    return this.workspaceModel.findByIdAndUpdate(
      workspaceId,
      { $addToSet: { members: userId } },
      { new: true },
    );
  }

  async delete(id: string) {
  const deleted = await this.workspaceModel.findByIdAndDelete(id);

  if (!deleted) {
    return {
      success: false,
      message: 'Workspace not found',
    };
  }

  return {
    success: true,
    message: 'Workspace deleted successfully',
    data: deleted,
  };
}

  async countActiveWorkspaces(): Promise<number> {
    return this.workspaceModel.countDocuments({ isActive: true });
  }

  async countAllWorkspaces(): Promise<number> {
    return this.workspaceModel.countDocuments();
  }
}