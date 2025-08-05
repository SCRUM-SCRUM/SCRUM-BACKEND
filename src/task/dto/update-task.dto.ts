import { IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  statusColumnId?: string; 

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  assignedToUserId?: number;
}
