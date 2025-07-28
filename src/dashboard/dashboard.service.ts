// src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getDashboard(userId: number) {
    // Get user info
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    
    // Get metrics
    const metrics = await this.getMetrics(userId);
    
    return {
      user,
      metrics
    };
  }

  private async getMetrics(userId: number) {
    return [
      { name: 'Active Workspaces', count: 5 },
      { name: 'Total Workspaces', count: 8 },
      { name: 'Completed Tasks', count: 12 },
      { name: 'In Progress', count: 3 },
      { name: 'Team Members', count: 4 }
    ];
  }
}