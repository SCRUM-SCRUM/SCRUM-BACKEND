/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: string; // "Pending", "In Progress", "Done"

  @IsString()
  @IsOptional()
  workspaceId?: string; // optional if tasks belong to a workspace/team
}
