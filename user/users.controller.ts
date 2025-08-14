import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(ApiKeyGuard) 
  async create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard) 
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
