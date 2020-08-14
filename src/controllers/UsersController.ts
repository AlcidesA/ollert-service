import { User } from '@models/User'

export class UsersController {
  static async list (_, res) {
    try {
      const users = await User.find()

      return res.status(200).send(users)
    } catch (error) {
      return res.status(400).send({ error: 'List failed' })
    }
  }
}
