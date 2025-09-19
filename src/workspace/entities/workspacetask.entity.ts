<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Workspace } from './workspace.entity';
import { WorkspaceSubtask } from './WorkspaceSubtask.entity';

@Entity()
export class WorkspaceTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'todo' })
  status: 'todo' | 'in-progress' | 'done';

  @ManyToOne(() => Workspace, (workspace) => workspace.tasks, { onDelete: 'CASCADE' })
  workspace: Workspace;

  @OneToMany(() => WorkspaceSubtask, (subtask) => subtask.task, { cascade: true })
  subtasks: WorkspaceSubtask[];

}
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Workspace } from './workspace.entity';
import { WorkspaceSubtask } from './WorkspaceSubtask.entity';

@Entity()
export class WorkspaceTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'todo' })
  status: 'todo' | 'in-progress' | 'done';

  @ManyToOne(() => Workspace, (workspace) => workspace.tasks, { onDelete: 'CASCADE' })
  workspace: Workspace;

  @OneToMany(() => WorkspaceSubtask, (subtask) => subtask.task, { cascade: true })
  subtasks: WorkspaceSubtask[];

}
>>>>>>> master
