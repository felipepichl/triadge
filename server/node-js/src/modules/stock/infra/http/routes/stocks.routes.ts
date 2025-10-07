import { Router } from 'express'

import { BuyController } from '../controllers/buy/BuyController'
import { CreateStockController } from '../controllers/createStock/CreateStockController'
import { GetPortfolioQuotesController } from '../controllers/getPortfolioQuotes/GetPortfolioQuotesController'
import { GetTotalInvestedAndCurrentQuoteController } from '../controllers/getTotalInvestedAndCurrentQuote/GetTotalInvestedAndCurrentQuoteController'
import { ListByTypeController } from '../controllers/listByType/ListByTypeController'
import { ListFIIPurchasesByMonthController } from '../controllers/listFIIPurchasesByMonth/ListFIIPurchasesByMonthController'

const stocksRoutes = Router()

const createStockController = new CreateStockController()
const buyController = new BuyController()
const listByType = new ListByTypeController()
const getPortfolioQuotes = new GetPortfolioQuotesController()
const getTotalInvestedAndCurrentQuote =
  new GetTotalInvestedAndCurrentQuoteController()
const listFIIPurchasesByMonthController =
  new ListFIIPurchasesByMonthController()

stocksRoutes.post('', createStockController.handle)
stocksRoutes.post('/buy', buyController.handle)
stocksRoutes.get('/type', listByType.handle)
stocksRoutes.get('/portfolio', getPortfolioQuotes.handle)
stocksRoutes.get('/investement', getTotalInvestedAndCurrentQuote.handle)
stocksRoutes.get(
  '/fii-purchases/by-month',
  listFIIPurchasesByMonthController.handle,
)

export { stocksRoutes }
