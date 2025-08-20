import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TaskModule } from '../tasks/task.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';
import { MoreThan } from 'typeorm';



@Module({
  imports: [
    TaskModule, 
    UsersModule, 
    TypeOrmModule.forFeature([ Meeting]),],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
