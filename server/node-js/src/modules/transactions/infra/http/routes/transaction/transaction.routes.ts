import { Router } from 'express'

import { CreateTransactionController } from '../../controllers/transaction/createTransaction/CreateTransactionController'
import { ListAllTransactionsController } from '../../controllers/transaction/listAllTransactions/ListAllTransactionsController'
import { ListByDateRangeController } from '../../controllers/transaction/listByDateRange/ListByDateRangeController'

const transactionsRoutes = Router()

const createTransactionController = new CreateTransactionController()
const listAllTransactionsController = new ListAllTransactionsController()
const listByDateRangeController = new ListByDateRangeController()

transactionsRoutes.post('/', createTransactionController.handle)
transactionsRoutes.get('/', listAllTransactionsController.handle)
transactionsRoutes.get('/', listByDateRangeController.handle)

export { transactionsRoutes }
