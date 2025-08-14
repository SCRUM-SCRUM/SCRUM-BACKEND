import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/entities/task.entity';
import { CalendarTask } from './calendartask.entity';
import { Comment } from 'src/comments/comment.entity';


@Entity()
export class CalendarUser {
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

  @OneToMany(() => CalendarTask, calendarTask => calendarTask.calendarUser)
  calendarTasks: CalendarTask[];

  @OneToMany(() => Comment, comment => comment.user)
comments: Comment[];

}