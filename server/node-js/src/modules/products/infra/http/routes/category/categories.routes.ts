import { Router } from 'express'

import { CreateCategoryController } from '../../controllers/category/CreateCategoryController'

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()

categoriesRoutes.post('', createCategoryController.handle)

export { categoriesRoutes }
