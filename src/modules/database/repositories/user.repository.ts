import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: false })
  hashedPassword: string;
}
