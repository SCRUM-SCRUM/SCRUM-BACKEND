/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TaskService } from '../tasks/task.service';
import { UsersService } from '../users/user.service';
import { DashboardMetricsDto } from './dto/dashboard-metrics.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting } from './schemas/meeting.schema';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingResponseDto } from './dto/meeting-response.dto';
import { WorkspaceService } from '../workspace/workspace.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UsersService,
    private readonly workspaceService: WorkspaceService,
    @InjectModel(Meeting.name)
    private readonly meetingModel: Model<Meeting>,
  ) {}

  async getMetrics(): Promise<DashboardMetricsDto> {
    
    const [completedTasks, inProgressTasks, teamMembers, activeWorkspaces, totalWorkspaces] =
      await Promise.all([
        this.taskService.countByStatus('Done'),
        this.taskService.countByStatus('In Progress'),
        this.userService.countAll(),
        this.workspaceService.countActiveWorkspaces(),
        this.workspaceService.countAllWorkspaces(),
      ]);

    return {
      completedTasks,
      inProgressTasks,
      teamMembers,
      activeWorkspaces,
      totalWorkspaces,
    };
  }

  async getUpcomingMeetings(): Promise<MeetingResponseDto[]> {
    const now = new Date();

    const meetings: Meeting[] = await this.meetingModel
      .find({ dateTime: { $gt: now } })
      .sort({ dateTime: 1 })
      .exec();

    return meetings.map((m) => ({
      id: m._id.toString(),
      title: m.title,
      description: m.description,
      dateTime: m.dateTime,
      link: m.link,
      createdAt: m.createdAt ?? new Date(),
    }));
  }

  async addMeeting(dto: CreateMeetingDto): Promise<MeetingResponseDto> {
    const meeting = new this.meetingModel({
      ...dto,
      isRecurring: dto.isRecurring ?? false,
    });

    const saved: Meeting = await meeting.save();

    return {
      id: saved._id.toString(),
      title: saved.title,
      description: saved.description,
      dateTime: saved.dateTime,
      link: saved.link,
      createdAt: saved.createdAt ?? new Date(),
    };
  }
}
