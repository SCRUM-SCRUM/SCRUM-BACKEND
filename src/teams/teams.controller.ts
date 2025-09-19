import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './entities/team.entity';
import { Member } from '../teammember/entities/member.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body('name') name: string): Promise<Team> {
    return this.teamsService.createTeam(name);
  }

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamsService.getTeams();
  }

  @Post(':id/members')
  addMember(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('role') role: string,
  ): Promise<Member> {
    return this.teamsService.createMember(name, role, { id } as Team);
  }

  @Patch(':id')
async updateTeam(
  @Param('id') id: string,
  @Body('name') name: string,
): Promise<Team> {
  return this.teamsService.updateTeam(id, name);
}

 @Patch('members/:id')
async updateMember(
  @Param('id') id: string,
  @Body('name') name: string,
  @Body('role') role: string,
): Promise<Member> {
  return this.teamsService.updateMember(id, name, role);
}
}