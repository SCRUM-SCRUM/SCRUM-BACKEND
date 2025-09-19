import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notification } from '../notifications/entities/notification.entity';
import { Task } from '../tasks/entities/task.entity';
import { Comment } from '../comments/comment.entity'; 

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  verificationToken: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Notification, notification => notification.recipient)
  notifications: Notification[];

  @OneToMany(() => Comment, comment => comment.user) 
  comments: Comment[]; 

  @OneToMany(() => Task, task => task.assigneeUser) 
  tasks: Task[]; 
}
