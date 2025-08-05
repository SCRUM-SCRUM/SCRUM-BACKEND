import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dateTime: Date;

  @Column()
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  // meeting.entity.ts
@Column({ default: false })
isRecurring: boolean;

@Column({ nullable: true })
recurrenceRule?: string; // e.g., "FREQ=WEEKLY;INTERVAL=2"
}
