import { Router } from 'express'

import { CreateFinancialCategoryController } from '../controllers/financialCategory/createFinancialCategory/CreateFinancialCategoryController'
import { ListAllCategoriesByUserController } from '../controllers/financialCategory/listAllCategoriesByUser/ListAllCategoriesByUserController'
import { CreateSubcategoryController } from '../controllers/subcategory/createSubcategory/CreateSubcategoryController'
import { ListSubcategoryByCategoryIdController } from '../controllers/subcategory/listSubcategoryByCategoryId/ListSubcategoryByCategoryIdController'

const financialCategoryRoutes = Router()

const createFinancialCategoryController =
  new CreateFinancialCategoryController()
const listAllCategoriesByUserController =
  new ListAllCategoriesByUserController()
const createSubcategoryController = new CreateSubcategoryController()
const listSubcategoryByCategoryIdController =
  new ListSubcategoryByCategoryIdController()

financialCategoryRoutes.post('/', createFinancialCategoryController.handle)
financialCategoryRoutes.get('/', listAllCategoriesByUserController.handle)
financialCategoryRoutes.post('/subcategory', createSubcategoryController.handle)
financialCategoryRoutes.get(
  '/subcategory/:parentCategoryId',
  listSubcategoryByCategoryIdController.handle,
)

export { financialCategoryRoutes }