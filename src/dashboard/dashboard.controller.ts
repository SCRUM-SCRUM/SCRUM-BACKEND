/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingResponseDto } from './dto/meeting-response.dto';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  getMetrics() {
    return this.dashboardService.getMetrics();
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