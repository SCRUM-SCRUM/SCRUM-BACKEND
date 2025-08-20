import { Injectable } from '@nestjs/common';
import { TaskService } from '../tasks/task.service';
import { UsersService } from '../users/users.service';
import { DashboardMetricsDto } from './dto/dashboard-metrics.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Meeting } from './entities/meeting.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingResponseDto } from './dto/meeting-response.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UsersService,
    @InjectRepository(Meeting)
    private readonly meetingRepo: Repository<Meeting>,
  ) {}

  async getMetrics(userId: string): Promise<DashboardMetricsDto> {
    const [completedTasks, inProgressTasks, teamMembers] = await Promise.all([
      this.taskService.countByStatus('Done'),
      this.taskService.countByStatus('In Progress'),
      this.userService.countAll(),
    ]);


    return {
      completedTasks,
      inProgressTasks,
      teamMembers,
      activeWorkspaces: 0,
      totalWorkspaces: 0,
    };
  }

  async getUpcomingMeetings(): Promise<MeetingResponseDto[]> {
    const now = new Date();
    const meetings = await this.meetingRepo.find({
      where: {
        dateTime: MoreThan(now),
      },
      order: { dateTime: 'ASC' },
    });

    return meetings.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      dateTime: m.dateTime,
      link: m.link,
      createdAt: m.createdAt,
    }));
  }

  async addMeeting(dto: CreateMeetingDto): Promise<MeetingResponseDto> {
    const meeting = this.meetingRepo.create({ 
      ...dto, 
       isRecurring: dto.isRecurring ?? false,
      });
    const saved = await this.meetingRepo.save(meeting);

    return {
      id: saved.id,
      title: saved.title,
      description: saved.description,
      dateTime: saved.dateTime,
      link: saved.link,
      createdAt: saved.createdAt,
    };
  }
}
