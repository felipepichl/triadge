import { Router } from 'express'

import { CreateCategoryController } from '../../controllers/category/createCategory/CreateCategoryController'
import { ListAllCategoriesController } from '../../controllers/category/listAll/ListAllCategoriesController'

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
const listAllCategoriesController = new ListAllCategoriesController()

categoriesRoutes.post('', createCategoryController.handle)
categoriesRoutes.get('', listAllCategoriesController.handle)

export { categoriesRoutes }
