import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Workspace } from '../../workspace/entities/workspace.entity';
import { Task } from '../../tasks/entities/task.entity';

export enum ColumnName {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  QA = 'QA',
  BLOCKED = 'Blocked',
  DONE = 'Done',
}

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ColumnName })
  name: ColumnName;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Workspace, workspace => workspace.columns, { onDelete: 'CASCADE' })
  workspace: Workspace;

  @OneToMany(() => Task, task => task.column, { cascade: true })
  tasks: Task[];
}

 