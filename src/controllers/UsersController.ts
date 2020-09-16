import { UserRepository } from 'src/repositories/UserRepository'
import { getConnection } from 'typeorm'
import { Request, Response } from 'express'
import { Board } from '@models/Board'

export class UsersController {
  static async create (req: Request, res: Response) {
    try {
      const userRepository = getConnection().getCustomRepository(UserRepository)

      const hasUser = await userRepository.findByEmail(req.body.email)

      if (hasUser) {
        return res.status(400).send({ error: 'Email has already been taken' })
      }

      const user = await userRepository.create(req.body)
      await userRepository.save(user)

      res.sendStatus(201)
    } catch (error) {
      console.log(error)

      return res.status(400).send({ error: 'Create failed' })
    }
  }

  static async addBoard (req: Request, res: Response) {
    try {
      const connection = getConnection()
      const userId = req.params?.id

      const userRepository = connection.getCustomRepository(UserRepository)

      const user = await userRepository.getUserWithBoards(userId)

      if (!user) {
        return res.status(400).send({ error: 'User not found' })
      }

      const boardRepository = connection.getRepository(Board)

      const board = await boardRepository.create({ name: req.body?.name })
      await boardRepository.save(board)

      user.boards = [...user.boards, board]
      await userRepository.save(user)

      return res.sendStatus(201)
    } catch (error) {
      console.log(error)

      return res.status(400).send({ error: 'Add board failed' })
    }
  }
}
