import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.repository';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
