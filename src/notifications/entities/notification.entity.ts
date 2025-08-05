import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn, Index } from 'typeorm';
import { User } from '../../users/user.entity';

export type NotificationType = 'mention' | 'assignment' | 'due-soon' | 'status-change';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()  
  @ManyToOne(() => User, user => user.notifications, { onDelete: 'CASCADE' })
  recipient: User;

  @Column({ type: 'varchar' })
  type: NotificationType;

  @Column()
  message: string;

  @Column({ nullable: true })
  link: string;

  @Index() 
  @Column({ default: false })
  isRead: boolean;

  @Index()  
  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}