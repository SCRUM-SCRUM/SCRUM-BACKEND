/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe()) // Add this line for validation
async create(@Body() createUserDto: CreateUserDto) {
  console.log('=== CONTROLLER - CREATE USER ===');
  console.log('1. Raw Body received:', createUserDto);
  console.log('2. Type of createUserDto:', typeof createUserDto);
  console.log('3. Keys in createUserDto:', Object.keys(createUserDto));
  console.log('4. Name value:', createUserDto.name);
  console.log('5. Email value:', createUserDto.email);
  console.log('6. Password exists:', !!createUserDto.password);
  
  try {
    console.log('7. Calling usersService.create()...');
    const result = await this.usersService.create(createUserDto);
    console.log('8. User created successfully in controller');
    return result;
  } catch (error) {
    console.log('9. ERROR in controller:', error);
    throw error;
  }
}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}