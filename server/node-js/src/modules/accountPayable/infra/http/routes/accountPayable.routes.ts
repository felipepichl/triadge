import { Router } from 'express'

import { CreateAccountsPayableController } from '../controllers/createAccountsPayable/CreateAccountsPayableController'
import { CreateFixedAccountPayableController } from '../controllers/createFixedAccountPayable/CreateFixedAccountPayableController'
import { ListAllFixedAccountsByMonthController } from '../controllers/listAllFixedAccountsByMonth/ListAllFixedAccountsByMonthController'
import { ListAllUnfixedAccountsByMonthController } from '../controllers/listAllUnfixedAccountsByMonth/ListAllUnfixedAccountsByMonthController'

const accounsPayableRoutes = Router()

const createAccountsPayableController = new CreateAccountsPayableController()
const createFixedAccountsPayableController =
  new CreateFixedAccountPayableController()
const listAllFixedAccountsByMonthController =
  new ListAllFixedAccountsByMonthController()
const listAllUnfixedAccountsByMonthController =
  new ListAllUnfixedAccountsByMonthController()

accounsPayableRoutes.post('', createAccountsPayableController.handle)
accounsPayableRoutes.post('/fixed', createFixedAccountsPayableController.handle)
accounsPayableRoutes.get(
  '/fixed/month',
  listAllFixedAccountsByMonthController.handle,
)
accounsPayableRoutes.get(
  '/unfixed/month',
  listAllUnfixedAccountsByMonthController.handle,
)
accounsPayableRoutes.patch('/:id/pay')

export { accounsPayableRoutes }
