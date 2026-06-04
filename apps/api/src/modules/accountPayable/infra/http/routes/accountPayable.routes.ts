import { validateRequest } from '@shared/infra/http/middlewares/validateRequest'
import { Router } from 'express'

import { CreateAccountsPayableController } from '../controllers/createAccountsPayable/CreateAccountsPayableController'
import { CreateFixedAccountPayableController } from '../controllers/createFixedAccountPayable/CreateFixedAccountPayableController'
import { ListAllFixedAccountsByMonthController } from '../controllers/listAllFixedAccountsByMonth/ListAllFixedAccountsByMonthController'
import { ListAllPaidAccountsByMonthController } from '../controllers/listAllPaidAccountsByMonth/ListAllPaidAccountsByMonthController'
import { ListAllUnfixedAccountsByMonthController } from '../controllers/listAllUnfixedAccountsByMonth/ListAllUnfixedAccountsByMonthController'
import { ListAllUnpaidAccountsByMonthController } from '../controllers/listAllUnpaidAccountsByMonth/ListAllUnpaidAccountsByMonthController'
import { MarkAccountPayableAsPaidController } from '../controllers/markAccountPayableAsPaidController/MarkAccountPayableAsPaidController'
import { UpdateAmountVariableController } from '../controllers/updateAmountVariableController/UpdateAmountVariableController'
import { UpdateInterestPaidController } from '../controllers/updateInterestPaid/UpdateInterestPaidController'
import {
  accountPayableIdParamSchema,
  createAccountPayableSchema,
  createFixedAccountPayableSchema,
  monthQuerySchema,
  updateAmountSchema,
} from '../schemas/accountPayableSchemas'

const accountsPayableRoutes = Router()

const createAccountsPayableController = new CreateAccountsPayableController()
const createFixedAccountsPayableController =
  new CreateFixedAccountPayableController()
const listAllFixedAccountsByMonthController =
  new ListAllFixedAccountsByMonthController()
const listAllPaidAccountsByMonthController =
  new ListAllPaidAccountsByMonthController()
const listAllUnfixedAccountsByMonthController =
  new ListAllUnfixedAccountsByMonthController()
const listAllUnpaidAccountsByMonthController =
  new ListAllUnpaidAccountsByMonthController()
const markAccountPayableAsPaidController =
  new MarkAccountPayableAsPaidController()
const updateAmountVariableController = new UpdateAmountVariableController()
const updateInterestPaidController = new UpdateInterestPaidController()

accountsPayableRoutes.post(
  '',
  validateRequest({ body: createAccountPayableSchema }),
  createAccountsPayableController.handle,
)
accountsPayableRoutes.post(
  '/fixed',
  validateRequest({ body: createFixedAccountPayableSchema }),
  createFixedAccountsPayableController.handle,
)
accountsPayableRoutes.get(
  '/fixed/month',
  validateRequest({ query: monthQuerySchema }),
  listAllFixedAccountsByMonthController.handle,
)
accountsPayableRoutes.get(
  '/paid/month',
  validateRequest({ query: monthQuerySchema }),
  listAllPaidAccountsByMonthController.handle,
)
accountsPayableRoutes.get(
  '/unfixed/month',
  validateRequest({ query: monthQuerySchema }),
  listAllUnfixedAccountsByMonthController.handle,
)
accountsPayableRoutes.get(
  '/unpaid/month',
  validateRequest({ query: monthQuerySchema }),
  listAllUnpaidAccountsByMonthController.handle,
)
accountsPayableRoutes.patch(
  '/:id/pay',
  validateRequest({ params: accountPayableIdParamSchema }),
  markAccountPayableAsPaidController.handle,
)

accountsPayableRoutes.patch(
  '/:id/amount-variable',
  validateRequest({
    params: accountPayableIdParamSchema,
    body: updateAmountSchema,
  }),
  updateAmountVariableController.handle,
)

accountsPayableRoutes.patch(
  '/:id/interest-paid',
  validateRequest({
    params: accountPayableIdParamSchema,
    body: updateAmountSchema,
  }),
  updateInterestPaidController.hanlde,
)

export { accountsPayableRoutes }
