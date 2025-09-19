<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WorkspaceTask } from './workspacetask.entity';

@Entity()
export class WorkspaceSubtask {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => WorkspaceTask, (task) => task.subtasks, { onDelete: 'CASCADE' })
  task: WorkspaceTask;
}
=======
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WorkspaceTask } from './workspacetask.entity';

@Entity()
export class WorkspaceSubtask {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => WorkspaceTask, (task) => task.subtasks, { onDelete: 'CASCADE' })
  task: WorkspaceTask;
}
>>>>>>> master
