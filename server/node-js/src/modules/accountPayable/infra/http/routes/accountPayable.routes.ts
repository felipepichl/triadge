import { Router } from 'express'

import { CreateAccountsPayableController } from '../controllers/createAccountsPayable/CreateAccountsPayableController'
import { CreateFixedAccountPayableController } from '../controllers/createFixedAccountPayable/CreateFixedAccountPayableController'
import { ListAllFixedAccountsByMonthController } from '../controllers/listAllFixedAccountsByMonth/ListAllFixedAccountsByMonthController'
import { ListAllPaidAccountsByMonthController } from '../controllers/listAllPaidAccountsByMonth/ListAllPaidAccountsByMonthController'
import { ListAllUnfixedAccountsByMonthController } from '../controllers/listAllUnfixedAccountsByMonth/ListAllUnfixedAccountsByMonthController'
import { ListAllUnpaidAccountsByMonthController } from '../controllers/listAllUnpaidAccountsByMonth/ListAllUnpaidAccountsByMonthController'
import { MarkAccountPayableAsPaidController } from '../controllers/markAccountPayableAsPaidController/MarkAccountPayableAsPaidController'

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

export { accounsPayableRoutes }
