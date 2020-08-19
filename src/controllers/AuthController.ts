import { UserRepository } from 'src/repositories/UserRepository'
import { getConnection } from 'typeorm'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

export class AuthController {
  static async authenticate (req: Request, res: Response) {
    try {
      const userRepository = getConnection().getCustomRepository(UserRepository)
      const { email, password } = req.body

      const user = await userRepository.findByEmail(email)

      if (!user) {
        return res.status(401).send({ error: 'The email you’ve entered doesn’t match any account.' })
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        return res.status(401).send({ error: 'The password you’ve entered is incorrect.' })
      }

      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' })

      delete user.password

      return res.status(200).send({
        user,
        token
      })
    } catch (error) {
      console.log(error)
      return res.status(200).send({ error: 'Authentication failed' })
    }
  }
}
