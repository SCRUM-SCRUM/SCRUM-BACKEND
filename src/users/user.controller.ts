/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, Patch, UseGuards} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '@/commitment/roles.decorator';
import { RolesGuard } from '@/commitment/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<unknown> {
    return await this.userService.create(data);
  }

  @Get()
  async findAll(): Promise<unknown> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> {
    return await this.userService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<unknown> {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<unknown> {
    return await this.userService.delete(id);
  }

   // ✅ Only admins can change user roles
  @Patch(':id/role')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('member')
  async updateUserRole(
    @Param('id') id: string,
    @Body('role') role: 'admin' | 'scrum_master' | 'member',
  ) {
    return this.userService.updateRole(id, role);
  }
}
