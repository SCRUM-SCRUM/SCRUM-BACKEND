import { IsString, IsNotEmpty, IsDate, IsUrl, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetingDto {
  @ApiProperty({
    example: 'Team Standup',
    description: 'Title of the meeting',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Daily sync meeting',
    description: 'Meeting description',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2025-08-16T10:00:00Z',
    description: 'Meeting date and time in ISO format',
    required: true
  })
  @IsDate()
  @Type(() => Date)
  dateTime: Date;

  @ApiProperty({
    example: 'https://meet.example.com/standup',
    description: 'Meeting URL',
    required: true
  })
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @ApiProperty({
    example: false,
    description: 'Whether the meeting recurs',
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @ApiProperty({
    example: 'RRULE:FREQ=WEEKLY;INTERVAL=1',
    description: 'Recurrence rule if meeting is recurring',
    required: false
  })
  @IsOptional()
  @IsString()
  recurrenceRule?: string;
}