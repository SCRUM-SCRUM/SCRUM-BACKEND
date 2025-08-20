export class MeetingResponseDto {
  id: string;
  title: string;
  description: string;
  dateTime: Date;
  link: string;
  createdAt: Date;
  isRecurring?: boolean;
  recurrenceRule?: string; 
}
