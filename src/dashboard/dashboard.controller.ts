import {
  Controller,
  Get,
  Post,
  Body,
  Request,
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
  getMetrics(@Request() req) {
    return this.dashboardService.getMetrics(req.user.userId);
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
