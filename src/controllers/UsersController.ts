import { User } from '@models/User'
import { UserRepository } from 'src/repositories/UserRepository'
import { getConnection } from 'typeorm'

export class UsersController {
  static async list (_, res) {
    try {
      const userRepository = getConnection().getCustomRepository(UserRepository)
      const users = await userRepository.find()

      return res.status(200).send(users)
    } catch (error) {
      return res.status(400).send({ error: 'List failed' })
    }
  }

  static async create (req, res) {
    try {
      const userRepository = getConnection().getCustomRepository(UserRepository)

      const hasUser = await userRepository.findByEmail(req.body.email)

      if (hasUser) {
        return res.status(400).send({ error: 'Email has already been taken' })
      }

      const user = await userRepository.create(req.body)
      await userRepository.save(user)

      res.status(201).send()
    } catch (error) {
      return res.status(400).send({ error: 'Create failed' })
    }
  }
}
