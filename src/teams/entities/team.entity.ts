import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Member } from '../../teammember/entities/member.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g. Development Team

  @Column({ default: 0 })
  memberCount: number;

  @OneToMany(() => Member, (member) => member.team, { cascade: true })
  members: Member[];
}
