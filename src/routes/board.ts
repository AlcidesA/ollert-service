import express from 'express'
import { BoardController } from '@controllers/BoardController'
import { authMiddleware } from 'src/middlewares/authentication'

const router = express.Router()

router.get('/boards/:id', authMiddleware, BoardController.get)
router.delete('/boards/:id', authMiddleware, BoardController.remove)
router.post('/boards/:id/list', authMiddleware, BoardController.addList)

export default router
