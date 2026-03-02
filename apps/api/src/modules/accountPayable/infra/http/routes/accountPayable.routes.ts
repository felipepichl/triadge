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

accounsPayableRoutes.post('', createAccountsPayableController.handle)
accounsPayableRoutes.post('/fixed', createFixedAccountsPayableController.handle)
accounsPayableRoutes.get(
  '/fixed/month',
  listAllFixedAccountsByMonthController.handle,
)
accounsPayableRoutes.get(
  '/paid/month',
  listAllPaidAccountsByMonthController.handle,
)
accounsPayableRoutes.get(
  '/unfixed/month',
  listAllUnfixedAccountsByMonthController.handle,
)
accounsPayableRoutes.get(
  '/unpaid/month',
  listAllUnpaidAccountsByMonthController.handle,
)
accounsPayableRoutes.patch(
  '/:id/pay',
  markAccountPayableAsPaidController.handle,
)

accounsPayableRoutes.patch(
  '/:id/amount-variable',
  updateAmountVariableController.handle,
)

accounsPayableRoutes.patch(
  '/:id/interest-paid',
  updateInterestPaidController.hanlde,
)

export { accounsPayableRoutes }
