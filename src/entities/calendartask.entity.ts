import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CalendarUser } from './calendaruser.entity';
import { CalendarWorkspace } from './calendarworkspace.entity';
import { Comment } from 'src/comments/comment.entity';



@Entity()
export class CalendarTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ default: 'To Do' })
  status: string;

  @Column()
  workspaceId: string;

  @ManyToOne(() => CalendarUser, Calendaruser => Calendaruser.calendarTasks, { nullable: true })
  @JoinColumn({ name: 'assigneeId' })
  calendarUser: CalendarUser;
  

  @ManyToOne(() => CalendarWorkspace)
  workspace: CalendarWorkspace;

  @OneToMany(() => Comment, comment => comment.task, { cascade: true }) 
comments: Comment[];
}
