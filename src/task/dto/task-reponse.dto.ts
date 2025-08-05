export class TaskResponseDto {
  id: string;
  title: string;
  description: string;
  workspaceId: string;
  assignedToUserId: number;
  statusColumnId: string;
  createdAt: Date;
  updatedAt: Date;
}
