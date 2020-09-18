import { EntityRepository, Repository } from 'typeorm'
import { Board } from '@models/Board'

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  getBoardWithLists (id: string) {
    return this.createQueryBuilder('board').leftJoinAndSelect('board.lists', 'lists').where('board.id = :id', { id }).getOne()
  }
}
