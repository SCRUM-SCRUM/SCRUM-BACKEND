<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column as DbColumn, ManyToOne, OneToMany } from 'typeorm';
import { ColumnEntity } from '../../columns/entities/column.entity';
import { Subtask } from '../../subtask/entities/subtask.entity';
import { User } from '../../users/user.entity';
import { Comment } from '../../comments/comment.entity';

export enum TaskStatus {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  QA = 'QA',
  BLOCKED = 'Blocked',
  DONE = 'Done',
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum Category {
  Calendar = 'Calendar',
  Workspace = 'Workspace', 
  IMPROVEMENT = 'Improvement',
  Task   = 'Task', 
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @DbColumn()
  title: string;

  @DbColumn({ nullable: true })
  description: string;

  @DbColumn({ nullable: true })
  assignee: string;

  @DbColumn({ nullable: true })
  dueDate: Date;

  @DbColumn({ type: 'enum', enum: TaskStatus, default: TaskStatus.TO_DO })
  status: TaskStatus;

  @DbColumn({ type: 'enum', enum: Priority, default: Priority.MEDIUM })
  priority: Priority;

  @DbColumn({ default: false })
  isDeleted: boolean;

  @DbColumn({ type:'enum', enum: Category, default: Category.Calendar}) 
  category: Category

  @ManyToOne(() => ColumnEntity, column => column.tasks, { onDelete: 'CASCADE' })
  column: ColumnEntity;

  @ManyToOne(() => User, user => user.tasks)
  assigneeUser: User;

  @OneToMany(() => Subtask, subtask => subtask.task, { cascade: true })
  subtasks: Subtask[];

  @OneToMany(() => Comment, (comment: Comment) => comment.task, { cascade: true })
comments: Comment[];
}
=======
import { Entity, PrimaryGeneratedColumn, Column as DbColumn, ManyToOne, OneToMany } from 'typeorm';
import { ColumnEntity } from '../../columns/entities/column.entity';
import { Subtask } from '../../subtask/entities/subtask.entity';
import { User } from '../../users/user.entity';
import { Comment } from '../../comments/comment.entity';

export enum TaskStatus {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  QA = 'QA',
  BLOCKED = 'Blocked',
  DONE = 'Done',
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum Category {
  Calendar = 'Calendar',
  Workspace = 'Workspace', 
  IMPROVEMENT = 'Improvement',
  Task   = 'Task', 
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @DbColumn()
  title: string;

  @DbColumn({ nullable: true })
  description: string;

  @DbColumn({ nullable: true })
  assignee: string;

  @DbColumn({ nullable: true })
  dueDate: Date;

  @DbColumn({ type: 'enum', enum: TaskStatus, default: TaskStatus.TO_DO })
  status: TaskStatus;

  @DbColumn({ type: 'enum', enum: Priority, default: Priority.MEDIUM })
  priority: Priority;

  @DbColumn({ default: false })
  isDeleted: boolean;

  @DbColumn({ type:'enum', enum: Category, default: Category.Calendar}) 
  category: Category

  @ManyToOne(() => ColumnEntity, column => column.tasks, { onDelete: 'CASCADE' })
  column: ColumnEntity;

  @ManyToOne(() => User, user => user.tasks)
  assigneeUser: User;

  @OneToMany(() => Subtask, subtask => subtask.task, { cascade: true })
  subtasks: Subtask[];

  @OneToMany(() => Comment, (comment: Comment) => comment.task, { cascade: true })
comments: Comment[];
}
>>>>>>> master
