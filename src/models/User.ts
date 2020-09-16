import bcrypt from 'bcrypt'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, ManyToMany, JoinTable } from 'typeorm'
import { Board } from './Board'

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

  @ManyToMany(type => Board, board => board.users, { cascade: true })
  @JoinTable()
  boards: Board[]

  @BeforeInsert()
  encryptPassword () {
    this.password = bcrypt.hashSync(this.password, saltRounds)
  }
}
