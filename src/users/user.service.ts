/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, Types } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

type UserDocument = User & Document;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Create a new user
  async create(dto: CreateUserDto): Promise<UserDocument> {
    const created = new this.userModel(dto);
    return await created.save();
  }

  // Get all users
  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  // Find user by id
  async findById(id: string | Types.ObjectId): Promise<UserDocument | null> {
    return await this.userModel.findById(id).exec();
  }

  // Find user by email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  // Update user
  async update(id: string, data: Partial<User>): Promise<UserDocument | null> {
    const updated = await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  // Delete user
  async delete(id: string): Promise<{ deleted: boolean }> {
    const res = await this.userModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('User not found');
    return { deleted: true };
  }

  // Count all users
  async countAll(): Promise<number> {
    return await this.userModel.countDocuments().exec();
  }
}
