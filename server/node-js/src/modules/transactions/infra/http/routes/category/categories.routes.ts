import { Router } from 'express'

import { CreateCategoryController } from '../../controllers/category/createCategory/CreateCategoryController'

const transactionsCategoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
// const listAllCategoriesController = new ListAllCategoriesController()

transactionsCategoriesRoutes.post(
  '/categories',
  createCategoryController.handle,
)
// transactionsCategoriesRoutes.get('', listAllCategoriesController.handle)

export { transactionsCategoriesRoutes }
