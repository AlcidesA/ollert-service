import express from 'express'
import { UsersController } from '@controllers/UsersController'

const router = express.Router()

router.post('/users', UsersController.create)
router.post('/users/:id/board', UsersController.addBoard)

export default router
