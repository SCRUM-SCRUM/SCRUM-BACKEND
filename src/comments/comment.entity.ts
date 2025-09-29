import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/user.entity';
import { CalendarTask } from '../entities/calendartask.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => Task, (task: Task) => task.comments)
  task: Task;

  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => CalendarTask, calendarTask => calendarTask.comments)
  calendarTask: CalendarTask;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
