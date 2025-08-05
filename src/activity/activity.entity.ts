import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  userId: number;

  @Column()
  projectId: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}