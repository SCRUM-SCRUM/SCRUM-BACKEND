/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(data: Partial<Project>) {
    const project = new this.projectModel(data);
    return project.save();
  }

  async findAll() {
    return this.projectModel.find().populate('workspaceId createdBy').exec();
  }

  async findByWorkspace(workspaceId: string) {
    return this.projectModel.find({ workspaceId }).populate('createdBy').exec();
  }

  async update(id: string, data: Partial<Project>) {
    return this.projectModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}
