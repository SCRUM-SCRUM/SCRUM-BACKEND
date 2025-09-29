import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Member } from '../member.entity';
import { WorkspaceTask } from './workspacetask.entity';
import { ColumnEntity } from '../../columns/entities/column.entity';


@Entity()
export class Workspace {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Member, (member) => member.workspace, { cascade: true })
  members: Member[];

  @OneToMany(() => WorkspaceTask, (task) => task.workspace)
  tasks: WorkspaceTask[];

  @OneToMany(() => ColumnEntity, (column) => column.workspace, { cascade: true })
   columns: ColumnEntity[];


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;
}

