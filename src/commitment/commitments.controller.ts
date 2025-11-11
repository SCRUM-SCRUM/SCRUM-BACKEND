/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommitmentsService } from './commitments.service';
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import { UpdateCommitmentDto } from './dto/update-commitment.dto';
import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

type TabType = 'All' | 'Upcoming' | 'Due Today' | 'Completed' | 'Archived';
type SortType = 'dueDate' | 'assignee' | 'updatedAt';

interface CommitmentQuery {
  tab?: TabType;
  assigneeId?: string;
  q?: string;
  priority?: string;
  sort?: SortType;
}

@Controller('commitments')
export class CommitmentsController {
  constructor(private readonly svc: CommitmentsService) {}

  @Post()
  async create(@Body() dto: CreateCommitmentDto): Promise<any> {
    return await this.svc.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<any> {
    return await this.svc.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCommitmentDto,
  ): Promise<any> {
    return await this.svc.update(id, dto);
  }

  @Get()
  async list(@Query() q: CommitmentQuery): Promise<any> {
    const params = {
      tab: q.tab,
      assigneeId: q.assigneeId,
      q: q.q,
      priority: q.priority,
      sort: q.sort,
    };

    return await this.svc.list(params);
  }

  @Patch(':id/archive')
  async archive(@Param('id') id: string): Promise<any> {
    return await this.svc.archive(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string): Promise<any> {
    return await this.svc.restore(id);
  }

  @Delete(':id')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@HttpCode(HttpStatus.NO_CONTENT)
async remove(@Param('id') id: string, @Req() req: any): Promise<void> {
  // Manual check with proper typing
  const userRoles: string[] = req.user?.roles || [];
  const allowedRoles = ['admin', 'scrum_master'];
  
  const hasRole = allowedRoles.some(role => userRoles.includes(role));
  
  if (!hasRole) {
    throw new ForbiddenException(
      `User roles do not include required roles`
    );
  }

  await this.svc.remove(id);
}

  @Patch(':id/complete')
  async complete(@Param('id') id: string): Promise<any> {
    return await this.svc.markComplete(id);
  }
}