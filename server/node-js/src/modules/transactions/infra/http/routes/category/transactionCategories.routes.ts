import { Router } from 'express'

import { CreateTransactionCategoryController } from '../../controllers/category/createTransacitionCategory/CreateTransactionCategoryController'
import { ListAllTransactionCategoriesController } from '../../controllers/category/listAllTransactionCategories/ListAllTransactionCategoriesController'

const transactionsCategoriesRoutes = Router()

const createTransactionCategoryController =
  new CreateTransactionCategoryController()
const listAllTransactionCategoriesController =
  new ListAllTransactionCategoriesController()

transactionsCategoriesRoutes.post(
  '/categories',
  createTransactionCategoryController.handle,
)
transactionsCategoriesRoutes.get(
  '/categories',
  listAllTransactionCategoriesController.handle,
)

export { transactionsCategoriesRoutes }
