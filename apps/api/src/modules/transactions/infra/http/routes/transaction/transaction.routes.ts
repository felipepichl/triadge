import { Router } from 'express'

import { CreateTransactionController } from '../../controllers/transaction/createTransaction/CreateTransactionController'
import { ListAllTransactionsController } from '../../controllers/transaction/listAllTransactions/ListAllTransactionsController'
import { ListByDateRangeController } from '../../controllers/transaction/listByDateRange/ListByDateRangeController'
import { ListByMonthController } from '../../controllers/transaction/listByMonth/ListByMonthController'
import { ListByTypeController } from '../../controllers/transaction/listByType/ListByTypeController'

const transactionsRoutes = Router()

const createTransactionController = new CreateTransactionController()
const listAllTransactionsController = new ListAllTransactionsController()
const listByDateRangeController = new ListByDateRangeController()
const listByType = new ListByTypeController()
const listByMonth = new ListByMonthController()

transactionsRoutes.post('/', createTransactionController.handle)
transactionsRoutes.get('/', listAllTransactionsController.handle)
transactionsRoutes.get('/date-range', listByDateRangeController.handle)
transactionsRoutes.get('/type', listByType.handle)
transactionsRoutes.get('/month', listByMonth.handle)

export { transactionsRoutes }
