import express from 'express'
import { UsersController } from '@controllers/UsersController'

const router = express.Router()

router.get('/users', UsersController.list)

export default router
