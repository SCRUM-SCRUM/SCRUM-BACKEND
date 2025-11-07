/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, Patch, Req} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
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

  @Patch(':id/role')
@UseGuards(AuthGuard('jwt'))
async updateUserRole(
  @Param('id') id: string,
  @Body('role') role: 'admin' | 'scrum_master' | 'member',
  @Req() req: any,
) {
  const currentUser = req.user;

  console.log('currentUser:', JSON.stringify(currentUser, null, 2));
  console.log('Target ID:', id);

  if (!currentUser) {
    throw new ForbiddenException('No authenticated user found');
  }

  const currentUserId = currentUser.userId?.toString();
  const currentRole = (currentUser.role || '').toString().trim();

  console.log('currentUserId:', currentUserId);
  console.log('currentRole:', currentRole);
  console.log('Is own ID?', currentUserId === id);
  console.log('Is admin?', currentRole === 'admin');

  if (currentUserId !== id && currentRole !== 'admin') {
    throw new ForbiddenException('You can only change your own role unless you are admin');
  }

  return this.userService.updateRole(id, role);
}
}