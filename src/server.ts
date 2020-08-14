import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import { createConnection } from 'typeorm'
import '@controllers/UsersController'
import userRouter from './routes/user'

createConnection().then(_ => {
  const app = express()
  app.use(bodyParser.json())

  app.use('/', userRouter)

  app.listen(3333)

  console.log('Started on port 3333')
}).catch(error => console.error(error))
