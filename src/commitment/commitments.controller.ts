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
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

// ✅ Match the expected shape from the service
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
  @UseGuards(RolesGuard)
  @Roles('member', 'admin', 'scrum_master')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.svc.remove(id);
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string): Promise<any> {
    return await this.svc.markComplete(id);
  }
}
