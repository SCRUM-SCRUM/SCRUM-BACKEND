import { Controller, Post, Body, Get, Query, Param, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CommitmentsService } from './commitments.service';
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import { UpdateCommitmentDto } from './dto/update-commitment.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('commitments')
export class CommitmentsController {
  constructor(private readonly svc: CommitmentsService) {}

 @Post()
create(@Body() dto: CreateCommitmentDto) {
  return this.svc.create(dto);
}

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCommitmentDto) {
    return this.svc.update(id, dto);
  }

   @Get()
  list(@Query() q: any) {
    const params = {
      tab: q.tab,
      assigneeId: q.assigneeId,
      q: q.q,
      priority: q.priority,
      sort: q.sort,
    };
    return this.svc.list(params);
  }

   @Patch(':id/archive')
  archive(@Param('id') id: string) {
    return this.svc.archive(id);
  }

@Delete(':id')
@UseGuards(RolesGuard)
@Roles('admin', 'scrum_master')
@HttpCode(HttpStatus.NO_CONTENT)
async remove(@Param('id') id: string) {
  await this.svc.remove(id);
}

@Patch(':id/complete')
async complete(@Param('id') id: string) {
  return this.svc.markComplete(id);
}
}