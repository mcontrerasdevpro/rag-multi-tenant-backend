import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'basic' })
  plan: string;

  // <-- Esta línea faltaba
  @OneToMany(() => User, (user) => user.company)
  users: User[];
}