import { IsNotEmpty, IsString, IsUUID, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  workspaceId: string;

  @IsUUID()
  @IsNotEmpty()
  statusColumnId: string;

  @IsNumber()
  @IsNotEmpty()
  assignedToUserId: number;
}
