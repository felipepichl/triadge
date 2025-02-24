import { Router } from 'express'

import { CreateStockController } from '../controllers/createStock/CreateStockController'

const stocksRoutes = Router()

const createStockController = new CreateStockController()

stocksRoutes.post('', createStockController.handle)

export { stocksRoutes }
