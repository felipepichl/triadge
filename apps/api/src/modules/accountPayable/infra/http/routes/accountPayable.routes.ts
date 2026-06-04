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

const accounsPayableRoutes = Router()

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

accounsPayableRoutes.post(
  '',
  validateRequest({ body: createAccountPayableSchema }),
  createAccountsPayableController.handle,
)
accounsPayableRoutes.post(
  '/fixed',
  validateRequest({ body: createFixedAccountPayableSchema }),
  createFixedAccountsPayableController.handle,
)
accounsPayableRoutes.get(
  '/fixed/month',
  validateRequest({ query: monthQuerySchema }),
  listAllFixedAccountsByMonthController.handle,
)
accounsPayableRoutes.get(
  '/paid/month',
  validateRequest({ query: monthQuerySchema }),
  listAllPaidAccountsByMonthController.handle,
)
accounsPayableRoutes.get(
  '/unfixed/month',
  validateRequest({ query: monthQuerySchema }),
  listAllUnfixedAccountsByMonthController.handle,
)
accounsPayableRoutes.get(
  '/unpaid/month',
  validateRequest({ query: monthQuerySchema }),
  listAllUnpaidAccountsByMonthController.handle,
)
accounsPayableRoutes.patch(
  '/:id/pay',
  validateRequest({ params: accountPayableIdParamSchema }),
  markAccountPayableAsPaidController.handle,
)

accounsPayableRoutes.patch(
  '/:id/amount-variable',
  validateRequest({
    params: accountPayableIdParamSchema,
    body: updateAmountSchema,
  }),
  updateAmountVariableController.handle,
)

accounsPayableRoutes.patch(
  '/:id/interest-paid',
  validateRequest({
    params: accountPayableIdParamSchema,
    body: updateAmountSchema,
  }),
  updateInterestPaidController.hanlde,
)

export { accounsPayableRoutes }
