/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './schemas/team.schema';
import { Member } from '../teammember/entities/member.schema';

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

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team> {
    return this.teamsService.getTeamById(id);
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

  @Delete(':id')
async deleteTeam(@Param('id') id: string): Promise<{ success: boolean }> {
  return this.teamsService.deleteTeam(id);
}

 @Patch('members/:id')
async updateMember(
  @Param('id') id: string,
  @Body('name') name: string,
  @Body('role') role: string,
): Promise<Member> {
  return this.teamsService.updateMember(id, name, role);
}

 @Delete('members/:id')
async removeMember(@Param('id') id: string): Promise<{ success: boolean }> {
  return this.teamsService.removeMember(id);
}
}