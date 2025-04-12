import { Router } from 'express'

import { CreateStockController } from '../controllers/createStock/CreateStockController'
import { GetPortfolioQuotesController } from '../controllers/getPortfolioQuotes/GetPortfolioQuotesController'
import { GetTotalInvestedAndCurrentQuoteController } from '../controllers/getTotalInvestedAndCurrentQuote/GetTotalInvestedAndCurrentQuoteController'
import { ListByTypeController } from '../controllers/listByType/ListByTypeController'

const stocksRoutes = Router()

const createStockController = new CreateStockController()
const listByType = new ListByTypeController()
const getPortfolioQuotes = new GetPortfolioQuotesController()
const getTotalInvestedAndCurrentQuote =
  new GetTotalInvestedAndCurrentQuoteController()

stocksRoutes.post('', createStockController.handle)
stocksRoutes.get('/type', listByType.handle)
stocksRoutes.get('/portfolio', getPortfolioQuotes.handle)
stocksRoutes.get('/investement', getTotalInvestedAndCurrentQuote.handle)

export { stocksRoutes }
