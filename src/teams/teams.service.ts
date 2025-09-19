import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { Member } from '../teammember/entities/member.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamRepo: Repository<Team>,
    @InjectRepository(Member) private readonly memberRepo: Repository<Member>,
  ) {}

  async createTeam(name: string): Promise<Team> {
    const team = this.teamRepo.create({ name });
    return this.teamRepo.save(team);
  }

  async getTeams(): Promise<Team[]> {
    return this.teamRepo.find({ relations: ['members'] });
  }

  async createMember(name: string, role: string, team: Team): Promise<Member> {
  const member = this.memberRepo.create({ name, role, team });

  // Safely increment member count
  team.memberCount = (team.memberCount || 0) + 1;
  await this.teamRepo.save(team);

  return this.memberRepo.save(member);
}

async updateTeam(id: string, name: string): Promise<Team> {
  const team = await this.teamRepo.findOne({ where: { id }, relations: ['members'] });
  if (!team) throw new Error('Team not found');
  team.name = name;
  return this.teamRepo.save(team);
}

async updateMember(id: string, name: string, role: string): Promise<Member> {
  const member = await this.memberRepo.findOne({ where: { id }, relations: ['team'] });
  if (!member) throw new Error('Member not found');
  member.name = name;
  member.role = role;
  return this.memberRepo.save(member);
}
}