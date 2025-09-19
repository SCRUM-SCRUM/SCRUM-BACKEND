<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() export class CalendarWorkspace { @PrimaryGeneratedColumn('uuid') id: string;

=======
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() export class CalendarWorkspace { @PrimaryGeneratedColumn('uuid') id: string;

>>>>>>> master
@Column() name: string; }