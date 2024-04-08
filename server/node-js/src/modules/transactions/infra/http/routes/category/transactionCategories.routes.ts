import { Router } from 'express'

import { CreateTransactionCategoryController } from '../../controllers/category/createTransacitionCategory/CreateTransactionCategoryController'

const transactionsCategoriesRoutes = Router()

const createCategoryController = new CreateTransactionCategoryController()
// const listAllCategoriesController = new ListAllCategoriesController()

transactionsCategoriesRoutes.post(
  '/categories',
  createCategoryController.handle,
)
// transactionsCategoriesRoutes.get('', listAllCategoriesController.handle)

export { transactionsCategoriesRoutes }
