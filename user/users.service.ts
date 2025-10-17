/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // create user
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    const saved = await newUser.save();
    // go through unknown first to avoid TS "may be a mistake" cast complaint
    return saved as unknown as UserDocument;
  }

  // find all users
  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find().exec();
    return users as unknown as UserDocument[];
  }

  // remove user by id
  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}