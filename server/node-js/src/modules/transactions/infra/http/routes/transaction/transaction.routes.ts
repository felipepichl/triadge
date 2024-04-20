import { Router } from 'express'

import { CreateTransactionController } from '../../controllers/transaction/createTransaction/CreateTransactionController'

const transactionsRoutes = Router()

const createTransactionController = new CreateTransactionController()

transactionsRoutes.post('/', createTransactionController.handle)

export { transactionsRoutes }
