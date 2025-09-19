import { IsNotEmpty, IsOptional, IsEnum, IsISO8601, IsUUID,  } from 'class-validator';
import { CommitmentStatus } from '../commitments.entity';

export class CreateCommitmentDto {
 @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsISO8601()
  dueDate: string; // ISO date string

  @IsOptional()
  @IsUUID()
  assigneeId?: string;

  @IsOptional()
  linkedTaskId?: string;

  @IsOptional()
  @IsEnum(['High', 'Medium', 'Low'])
  priority?: 'High' | 'Medium' | 'Low';

  @IsOptional()
  @IsEnum(CommitmentStatus)
  status?: CommitmentStatus;
}