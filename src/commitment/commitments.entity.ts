import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum CommitmentStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

@Entity('commitments')
export class Commitment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

   @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date | null;
  
  // Nullable many-to-one to User; adjust inverse side on your User entity
  @ManyToOne(() => User, (u) => (u as any).commitments, { nullable: true, eager: true })
  @JoinColumn({ name: 'assigneeId' })
  assignee?: User | null;

  @Column({ type: 'uuid', nullable: true })
  assigneeId?: string | null;

  @Column({ nullable: true })
  linkedTaskId?: string;

  @Column({ type: 'enum', enum: ['High', 'Medium', 'Low'], default: 'Medium' })
  priority: 'High' | 'Medium' | 'Low';

  @Column({ type: 'enum', enum: CommitmentStatus, default: CommitmentStatus.NOT_STARTED })
  status: CommitmentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  
  @Column({ default: false })
  archived: boolean;
}