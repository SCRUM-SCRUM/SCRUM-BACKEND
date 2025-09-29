import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() export class CalendarWorkspace { @PrimaryGeneratedColumn('uuid') id: string;

@Column() name: string; }
