import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,} from 'typeorm';
import { User } from '../../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 'Todo' })
  status: 'Todo' | 'In Progress' | 'Done';

  @Column()
  workspaceId: string;

  @Column() 
  assignedToUserId: number;

  @ManyToOne(() => User, { nullable: false }) 
  @JoinColumn({ name: 'assignedToUserId' })
  assignedTo: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
