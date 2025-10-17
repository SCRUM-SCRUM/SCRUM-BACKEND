/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Team } from './schemas/team.schema';
import { Member } from '../teammember/entities/member.schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
  ) {}

  // Create a new team
  async createTeam(name: string): Promise<Team> {
    const team = new this.teamModel({ name });
    return await team.save();
  }

  // Get all teams with members populated
  async getTeams(): Promise<Team[]> {
    return await this.teamModel.find().populate('members').exec();
  }

  // Create a new member and link to a team (accepts team id or team doc)
  async createMember(name: string, role: string, teamIdOrDoc: string | Team): Promise<Member> {
    // Resolve team id
    const teamId = typeof teamIdOrDoc === 'string' ? new Types.ObjectId(teamIdOrDoc) : teamIdOrDoc._id;

    // Ensure team exists
    const team = await this.teamModel.findById(teamId).exec();
    if (!team) throw new NotFoundException('Team not found');

    // Create member
    const member = new this.memberModel({ name, role, team: team._id });
    await member.save();

    // Atomically update team: increment count and push member id
    await this.teamModel.findByIdAndUpdate(
      team._id,
      { $inc: { memberCount: 1 }, $push: { members: member._id } },
      { new: true },
    ).exec();

    return member;
  }

  // Update team name
  async updateTeam(id: string, name: string): Promise<Team> {
    const updated = await this.teamModel.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    ).populate('members').exec();

    if (!updated) throw new NotFoundException('Team not found');
    return updated;
  }

  // Update member details
  async updateMember(id: string, name: string, role: string): Promise<Member> {
    const updated = await this.memberModel.findByIdAndUpdate(
      id,
      { name, role },
      { new: true },
    ).populate('team').exec();

    if (!updated) throw new NotFoundException('Member not found');
    return updated;
  }

  // Optional: remove member (decrement count and remove from members array)
  async removeMember(id: string): Promise<{ success: boolean }> {
    const member = await this.memberModel.findById(id).exec();
    if (!member) throw new NotFoundException('Member not found');

    // Remove member doc
    await this.memberModel.deleteOne({ _id: member._id }).exec();

    // Decrement memberCount and pull from members
    await this.teamModel.findByIdAndUpdate(
      member.team,
      { $inc: { memberCount: -1 }, $pull: { members: member._id } },
      { new: true },
    ).exec();

    return { success: true };
  }
}