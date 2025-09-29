import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Workspace } from './entities/workspace.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.members, { onDelete: 'CASCADE' })
  workspace: Workspace;
}

