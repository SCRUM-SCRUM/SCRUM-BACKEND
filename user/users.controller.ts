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
  async create(@Body() createUserDto: CreateUserDto) { // Use the actual DTO class
    console.log('=== CONTROLLER - CREATE USER ===');
    console.log('1. Received DTO:', createUserDto);
    console.log('2. DTO type:', typeof createUserDto);
    console.log('3. DTO constructor:', createUserDto.constructor.name);
    
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}