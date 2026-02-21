import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { UserRole } from '../enums/user-role.enum';


role: UserRole;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({
  type: 'enum',
  enum: UserRole,
  default: UserRole.USER,
})

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;
}