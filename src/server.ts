import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createConnection } from 'typeorm'
import '@controllers/UsersController'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import boardRouter from './routes/board'

createConnection().then(_ => {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())

  app.use('/', authRouter)
  app.use('/', userRouter)
  app.use('/', boardRouter)

  app.listen(3333)

  console.log('Started on port 3333')
}).catch(error => console.error(error))
