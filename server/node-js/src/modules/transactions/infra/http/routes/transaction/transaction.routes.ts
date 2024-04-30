import { Router } from 'express'

import { CreateTransactionController } from '../../controllers/transaction/createTransaction/CreateTransactionController'
import { ListAllTransactionsController } from '../../controllers/transaction/listAllTransactions/ListAllTransactionsController'

const transactionsRoutes = Router()

const createTransactionController = new CreateTransactionController()
const listAllTransactionsController = new ListAllTransactionsController()

transactionsRoutes.post('/', createTransactionController.handle)
transactionsRoutes.get('/', listAllTransactionsController.handle)

export { transactionsRoutes }
