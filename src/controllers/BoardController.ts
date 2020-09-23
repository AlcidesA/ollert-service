import { Board } from '@models/Board'
import { List } from '@models/List'
import { Request, Response } from 'express'
import { BoardRepository } from 'src/repositories/BoardRepository'
import { getConnection } from 'typeorm'

export class BoardController {
  static async addList (req: Request, res: Response) {
    try {
      const connection = getConnection()

      const boardRepository = connection.getCustomRepository(BoardRepository)
      const boardId = req.params?.id

      const board = await boardRepository.getBoardWithLists(boardId)
      if (!board) {
        return res.status(400).send({ error: 'Board not found' })
      }

      const listRepository = connection.getRepository(List)
      const list = await listRepository.create({ name: req.body?.name })
      await listRepository.save(list)

      board.lists = [...board.lists, list]
      await boardRepository.save(board)

      return res.sendStatus(201)
    } catch (error) {
      return res.status(500).send({ error: 'Error adding list' })
    }
  }

  static async get (req: Request, res: Response) {
    try {
      const boardId = req.params?.id
      const repository = getConnection().getCustomRepository(BoardRepository)

      const board = await repository.getBoardWithLists(boardId)

      return res.status(200).send({ board })
    } catch (error) {
      return res.status(500).send({ error: 'Error getting  list' })
    }
  }

  static async remove (req: Request, res: Response) {
    try {
      const repository = getConnection().getRepository(Board)

      await repository.delete(req.params?.id)

      return res.sendStatus(200)
    } catch (error) {
      return res.status(500).send({ error: 'Error removing board' })
    }
  }
}
