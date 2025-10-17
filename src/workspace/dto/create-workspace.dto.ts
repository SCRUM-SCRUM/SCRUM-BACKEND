/* eslint-disable prettier/prettier */
// create-workspace.dto.ts
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  members?: string[]; // Only strings from the API
}