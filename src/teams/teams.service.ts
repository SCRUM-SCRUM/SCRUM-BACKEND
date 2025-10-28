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

  // Get a specific team by ID
  async getTeamById(id: string): Promise<Team> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid team ID format');
    }
    
    const team = await this.teamModel.findById(id).populate('members').exec();
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  // Create a new member and link to a team (accepts team id or team doc)
  async createMember(name: string, role: string, teamIdOrDoc: string | Team): Promise<Member> {
    // Validate inputs
    if (!name || !role) {
      throw new NotFoundException('Name and role are required');
    }

    // Resolve team id
    let teamId: Types.ObjectId;
    if (typeof teamIdOrDoc === 'string') {
      if (!Types.ObjectId.isValid(teamIdOrDoc)) {
        throw new NotFoundException('Invalid team ID format');
      }
      teamId = new Types.ObjectId(teamIdOrDoc);
    } else {
      teamId = teamIdOrDoc._id as Types.ObjectId;
    }

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
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid team ID format');
    }

    const updated = await this.teamModel.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    ).populate('members').exec();

    if (!updated) throw new NotFoundException('Team not found');
    return updated;
  }

  // Delete a team and all its members
  async deleteTeam(id: string): Promise<{ success: boolean }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid team ID format');
    }

    const team = await this.teamModel.findById(id).exec();
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Delete all members of this team
    await this.memberModel.deleteMany({ team: team._id }).exec();

    // Delete the team
    await this.teamModel.findByIdAndDelete(id).exec();

    return { success: true };
  }

  // Update member details
  async updateMember(id: string, name: string, role: string): Promise<Member> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid member ID format');
    }

    if (!name || !role) {
      throw new NotFoundException('Name and role are required');
    }

    const updated = await this.memberModel.findByIdAndUpdate(
      id,
      { name, role },
      { new: true },
    ).populate('team').exec();

    if (!updated) throw new NotFoundException('Member not found');
    return updated;
  }

  // Remove member (decrement count and remove from members array)
  async removeMember(id: string): Promise<{ success: boolean }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid member ID format');
    }

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