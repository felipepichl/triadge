import { Router } from 'express'

import { CreateStockController } from '../controllers/createStock/CreateStockController'
import { ListByTypeController } from '../controllers/listByType/ListByTypeController'

const stocksRoutes = Router()

const createStockController = new CreateStockController()
const listByType = new ListByTypeController()

stocksRoutes.post('', createStockController.handle)
stocksRoutes.get('/type', listByType.handle)

export { stocksRoutes }
