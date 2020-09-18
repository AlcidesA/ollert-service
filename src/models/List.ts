import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Board } from './Board'

@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(type => Board, board => board.lists)
  board: Board
}
