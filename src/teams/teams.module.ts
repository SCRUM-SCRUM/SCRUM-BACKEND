import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { Member } from '../teammember/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Member])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
