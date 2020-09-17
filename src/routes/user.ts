import express from 'express'
import { UsersController } from '@controllers/UsersController'
import { authMiddleware } from 'src/middlewares/authentication'

const router = express.Router()

router.post('/users', UsersController.create)
router.post('/users/:id/board', authMiddleware, UsersController.addBoard)

export default router
