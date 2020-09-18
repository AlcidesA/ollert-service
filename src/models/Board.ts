import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { List } from './List'
import { User } from './User'

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(type => User, user => user.boards)
  users: User[]

  @OneToMany(type => List, list => list.board, { cascade: true })
  lists: List[]
}
