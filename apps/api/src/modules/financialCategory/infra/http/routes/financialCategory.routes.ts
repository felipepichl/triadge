import { validateRequest } from '@shared/infra/http/middlewares/validateRequest'
import { Router } from 'express'

import { CreateFinancialCategoryController } from '../controllers/financialCategory/createFinancialCategory/CreateFinancialCategoryController'
import { ListAllCategoriesByUserController } from '../controllers/financialCategory/listAllCategoriesByUser/ListAllCategoriesByUserController'
import { ListTotalSpentByFinancialCategoryController } from '../controllers/financialCategory/listTotalSpentByFinancialCategory/ListTotalSpentByFinancialCategoryController'
import { ListTotalSpentToFixedAccountPayableController } from '../controllers/financialCategory/listTotalSpentToFixedAccountPayable/ListTotalSpentToFixedAccountPayableController'
import { ListTotalSpentToUnfixedAccountsPayableController } from '../controllers/financialCategory/listTotalSpentToUnfixedAccountsPayable/ListTotalSpentToUnfixedAccountsPayableController'
import { CreateSubcategoryController } from '../controllers/subcategory/createSubcategory/CreateSubcategoryController'
import { ListSubcategoryByCategoryIdController } from '../controllers/subcategory/listSubcategoryByCategoryId/ListSubcategoryByCategoryIdController'
import {
  createFinancialCategorySchema,
  createSubcategorySchema,
  monthQuerySchema,
  parentCategoryIdParamSchema,
  totalSpentQuerySchema,
} from '../schemas/financialCategorySchemas'

const financialCategoryRoutes = Router()

const createFinancialCategoryController =
  new CreateFinancialCategoryController()
const listAllCategoriesByUserController =
  new ListAllCategoriesByUserController()
const createSubcategoryController = new CreateSubcategoryController()
const listSubcategoryByCategoryIdController =
  new ListSubcategoryByCategoryIdController()
const listTotalSpentByFinancialCategoryController =
  new ListTotalSpentByFinancialCategoryController()
const listTotalSpentToFixedAccountPayableController =
  new ListTotalSpentToFixedAccountPayableController()
const listTotalSpentToUnfixedAccountsPayableController =
  new ListTotalSpentToUnfixedAccountsPayableController()

financialCategoryRoutes.post(
  '/',
  validateRequest({ body: createFinancialCategorySchema }),
  createFinancialCategoryController.handle,
)
financialCategoryRoutes.get('/', listAllCategoriesByUserController.handle)
financialCategoryRoutes.post(
  '/subcategory',
  validateRequest({ body: createSubcategorySchema }),
  createSubcategoryController.handle,
)
financialCategoryRoutes.get(
  '/subcategory/:parentCategoryId',
  validateRequest({ params: parentCategoryIdParamSchema }),
  listSubcategoryByCategoryIdController.handle,
)
financialCategoryRoutes.get(
  '/total-spent',
  validateRequest({ query: totalSpentQuerySchema }),
  listTotalSpentByFinancialCategoryController.handle,
)
financialCategoryRoutes.get(
  '/total-spent/fixed/account-payable',
  validateRequest({ query: monthQuerySchema }),
  listTotalSpentToFixedAccountPayableController.handle,
)
financialCategoryRoutes.get(
  '/total-spent/unfixed/account-payable',
  validateRequest({ query: monthQuerySchema }),
  listTotalSpentToUnfixedAccountsPayableController.handle,
)

export { financialCategoryRoutes }
