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
   @Req() req: Request
) {
   const currentUser = (req as any).user;
  if (!currentUser) {
    throw new ForbiddenException('No authenticated user found on request');
  }

  // keep your authorization logic here
  if (currentUser.userId !== id && currentUser.role !== 'admin') {
    throw new ForbiddenException('You can only change your own role unless you are admin');
  }

  
 // ✅ Allow admins to update anyone, but members only themselves
if ((req as any).user.role !== 'admin' && (req as any).user.userId !== id) {
  throw new ForbiddenException('You can only update your own role');
}

return this.userService.updateRole(id, role);

}
}