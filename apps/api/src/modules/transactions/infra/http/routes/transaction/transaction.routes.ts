import { validateRequest } from '@shared/infra/http/middlewares/validateRequest'
import { Router } from 'express'

import { CreateTransactionController } from '../../controllers/transaction/createTransaction/CreateTransactionController'
import { ListAllTransactionsController } from '../../controllers/transaction/listAllTransactions/ListAllTransactionsController'
import { ListByDateRangeController } from '../../controllers/transaction/listByDateRange/ListByDateRangeController'
import { ListByMonthController } from '../../controllers/transaction/listByMonth/ListByMonthController'
import { ListByTypeController } from '../../controllers/transaction/listByType/ListByTypeController'
import {
  createTransactionSchema,
  dateRangeQuerySchema,
  monthQuerySchema,
  transactionTypeQuerySchema,
} from '../../schemas/transactionSchemas'

const transactionsRoutes = Router()

const createTransactionController = new CreateTransactionController()
const listAllTransactionsController = new ListAllTransactionsController()
const listByDateRangeController = new ListByDateRangeController()
const listByType = new ListByTypeController()
const listByMonth = new ListByMonthController()

transactionsRoutes.post(
  '/',
  validateRequest({ body: createTransactionSchema }),
  createTransactionController.handle,
)
transactionsRoutes.get('/', listAllTransactionsController.handle)
transactionsRoutes.get(
  '/date-range',
  validateRequest({ query: dateRangeQuerySchema }),
  listByDateRangeController.handle,
)
transactionsRoutes.get(
  '/type',
  validateRequest({ query: transactionTypeQuerySchema }),
  listByType.handle,
)
transactionsRoutes.get(
  '/month',
  validateRequest({ query: monthQuerySchema }),
  listByMonth.handle,
)

export { transactionsRoutes }
