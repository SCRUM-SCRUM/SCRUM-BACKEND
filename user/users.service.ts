/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
  console.log('=== USER SERVICE - CREATE METHOD ===');
  console.log('1. Received DTO in service:', createUserDto);
  console.log('2. DTO properties:');
  console.log('   - name:', createUserDto.name);
  console.log('   - email:', createUserDto.email);
  console.log('   - password exists:', !!createUserDto.password);
  
  // Manual validation as backup
  if (!createUserDto.name || !createUserDto.email || !createUserDto.password) {
    console.log('ERROR: Missing required fields in service');
    console.log('   - name missing:', !createUserDto.name);
    console.log('   - email missing:', !createUserDto.email);
    console.log('   - password missing:', !createUserDto.password);
    throw new Error('All fields are required: name, email, password');
  }

  try {
    console.log('3. Creating user with data:', {
      name: createUserDto.name,
      email: createUserDto.email,
      password: '***HIDDEN***'
    });
    
    const newUser = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password
    });
    
    console.log('4. User model created, saving...');
    const saved = await newUser.save();
    console.log('5. User saved successfully with ID:', saved._id);
    
    return saved as unknown as UserDocument;
  } catch (error) {
    console.log('6. ERROR in service:', error.message);
    throw error;
  }
}

  // find all users
  async findAll(): Promise<UserDocument[]> {
    console.log('=== FIND ALL USERS METHOD STARTED ===');
    try {
      console.log('1. Attempting to find all users...');
      const users = await this.userModel.find().exec();
      console.log('2. Users found:', users.length);
      console.log('3. Returning users...');
      return users as unknown as UserDocument[];
    } catch (error) {
      console.log('ERROR in findAll:', error.message);
      throw error;
    }
  }

  // remove user by id
  async remove(id: string): Promise<void> {
    console.log('=== REMOVE USER METHOD STARTED ===');
    console.log('1. Removing user with ID:', id);
    try {
      await this.userModel.findByIdAndDelete(id).exec();
      console.log('2. User removed successfully');
    } catch (error) {
      console.log('ERROR in remove:', error.message);
      throw error;
    }
  }
}