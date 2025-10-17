/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingResponseDto } from './dto/meeting-response.dto';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email?: string;
    [key: string]: any;
  };
}

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  getMetrics(@Req() req: AuthenticatedRequest) {
    const userId = req.user.userId; 
    return this.dashboardService.getMetrics(userId);
  }

  @Get('meetings')
  getMeetings(): Promise<MeetingResponseDto[]> {
    return this.dashboardService.getUpcomingMeetings();
  }

  @Post('meetings')
  addMeeting(
    @Body() dto: CreateMeetingDto,
  ): Promise<MeetingResponseDto> {
    return this.dashboardService.addMeeting(dto);
  }
}