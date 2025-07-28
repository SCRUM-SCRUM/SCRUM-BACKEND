import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/dashboard.dto';
import { Request } from 'express'; 

@Controller('dashboard')
@UseGuards(AuthGuard('local')) 
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  async getDashboard(@Req() req: Request) {
    const userId = Number(req.user?.id); // Make sure 'user' is attached by your guard
    return this.dashboardService.getDashboard(userId);
  }
}
