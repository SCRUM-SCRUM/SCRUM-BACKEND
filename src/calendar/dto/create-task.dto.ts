export class CreateTaskDto {
  title: string;
  assigneeId: string;
  dueDate: Date;
  startDate?: Date;
  endDate?: Date;
  workspaceId: string;
}