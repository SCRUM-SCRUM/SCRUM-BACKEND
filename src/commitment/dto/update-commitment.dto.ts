import { PartialType } from '@nestjs/mapped-types';
import { CreateCommitmentDto } from './create-commitment.dto';
import { IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { CommitmentStatus } from '../commitments.entity';

export class UpdateCommitmentDto extends PartialType(CreateCommitmentDto) {
  @IsOptional() @IsEnum(CommitmentStatus)
  status?: CommitmentStatus;

  @IsOptional() @IsBoolean()
  archived?: boolean;
}

