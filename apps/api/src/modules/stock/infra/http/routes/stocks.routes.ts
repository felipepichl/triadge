import { validateRequest } from '@shared/infra/http/middlewares/validateRequest'
import { Router } from 'express'

import { BuyController } from '../controllers/buy/BuyController'
import { GetPortfolioQuotesController } from '../controllers/getPortfolioQuotes/GetPortfolioQuotesController'
import { GetTotalInvestedAndCurrentQuoteController } from '../controllers/getTotalInvestedAndCurrentQuote/GetTotalInvestedAndCurrentQuoteController'
import { ListByTypeController } from '../controllers/listByType/ListByTypeController'
import { ListFIIPurchasesByMonthController } from '../controllers/listFIIPurchasesByMonth/ListFIIPurchasesByMonthController'
import { SellController } from '../controllers/sell/SellController'
import {
  buyStockSchema,
  monthQuerySchema,
  sellStockSchema,
  stockTypeQuerySchema,
} from '../schemas/stockSchemas'

const stocksRoutes = Router()

const buyController = new BuyController()
const sellController = new SellController()
const listByType = new ListByTypeController()
const getPortfolioQuotes = new GetPortfolioQuotesController()
const getTotalInvestedAndCurrentQuote =
  new GetTotalInvestedAndCurrentQuoteController()
const listFIIPurchasesByMonthController =
  new ListFIIPurchasesByMonthController()

stocksRoutes.post(
  '/buy',
  validateRequest({ body: buyStockSchema }),
  buyController.handle,
)
stocksRoutes.post(
  '/sell',
  validateRequest({ body: sellStockSchema }),
  sellController.handle,
)
stocksRoutes.get(
  '/type',
  validateRequest({ query: stockTypeQuerySchema }),
  listByType.handle,
)
stocksRoutes.get(
  '/portfolio',
  validateRequest({ query: stockTypeQuerySchema }),
  getPortfolioQuotes.handle,
)
stocksRoutes.get(
  '/investement',
  validateRequest({ query: stockTypeQuerySchema }),
  getTotalInvestedAndCurrentQuote.handle,
)
stocksRoutes.get(
  '/fii-purchases/by-month',
  validateRequest({ query: monthQuerySchema }),
  listFIIPurchasesByMonthController.handle,
)

export { stocksRoutes }
