import express from 'express'
import { UsersController } from '@controllers/UsersController'
import { authMiddleware } from 'src/middlewares/authentication'

const router = express.Router()

router.post('/users', UsersController.create)
router.get('/users/:id/boards', authMiddleware, UsersController.listBoards)
router.post('/users/:id/boards', authMiddleware, UsersController.addBoard)

export default router
