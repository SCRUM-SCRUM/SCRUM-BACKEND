<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarTask } from '../entities/calendartask.entity';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { TaskGateway } from './calendar.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarTask])],
  controllers: [CalendarController],
  providers: [CalendarService, TaskGateway],
  exports: [CalendarService],
})
export class CalendarModule {}
=======
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarTask } from '../entities/calendartask.entity';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { TaskGateway } from './calendar.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarTask])],
  controllers: [CalendarController],
  providers: [CalendarService, TaskGateway],
  exports: [CalendarService],
})
export class CalendarModule {}
>>>>>>> master
