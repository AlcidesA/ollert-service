import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export async function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).send({ error: 'Token not found' })
  }

  const [bearer, authToken] = token.split(' ')
  if (!/Bearer/.test(bearer)) {
    return res.status(401).send({ error: 'Bad token format' })
  }

  try {
    await jwt.verify(authToken, 'secret')
  } catch (err) {
    return res.status(401).send({ error: 'Invalid token' })
  }

  return next()
}
