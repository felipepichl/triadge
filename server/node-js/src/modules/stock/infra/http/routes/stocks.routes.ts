import { Router } from 'express'

import { CreateStockController } from '../controllers/createStock/CreateStockController'
import { GetPortfolioQuotesController } from '../controllers/getPortfolioQuotes/GetPortfolioQuotesController'
import { ListByTypeController } from '../controllers/listByType/ListByTypeController'

const stocksRoutes = Router()

const createStockController = new CreateStockController()
const listByType = new ListByTypeController()
const getPortfolioQuotes = new GetPortfolioQuotesController()

stocksRoutes.post('', createStockController.handle)
stocksRoutes.get('/type', listByType.handle)
stocksRoutes.get('/portifolio', getPortfolioQuotes.handle)

export { stocksRoutes }
