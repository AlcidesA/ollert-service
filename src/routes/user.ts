import express from 'express'
import { UsersController } from '@controllers/UsersController'

const router = express.Router()

router.get('/users', UsersController.list)
router.post('/users', UsersController.create)

export default router
