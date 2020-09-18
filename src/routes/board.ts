import express from 'express'
import { BoardController } from '@controllers/BoardController'

const router = express.Router()

router.post('/boards/:id/list', BoardController.addList)

export default router
