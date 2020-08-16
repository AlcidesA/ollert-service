import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm'
import bcrypt from 'bcrypt'

const saltRounds = 10
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  encryptPassword () {
    this.password = bcrypt.hashSync(this.password, saltRounds)
  }
}
