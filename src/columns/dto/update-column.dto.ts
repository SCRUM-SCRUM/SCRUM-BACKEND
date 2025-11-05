/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateColumnDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
