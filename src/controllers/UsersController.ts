import { UserRepository } from 'src/repositories/UserRepository'
import { getConnection } from 'typeorm'
import { Request, Response } from 'express'

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
}
