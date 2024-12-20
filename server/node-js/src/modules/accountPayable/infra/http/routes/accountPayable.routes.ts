import { Router } from 'express'

import { CreateAccountsPayableController } from '../controllers/createAccountsPayable/CreateAccountsPayableController'
import { CreateFixedAccountPayableController } from '../controllers/createFixedAccountPayable/CreateFixedAccountPayableController'

const accounsPayableRoutes = Router()

const createAccountsPayableController = new CreateAccountsPayableController()
const createFixedAccountsPayableController =
  new CreateFixedAccountPayableController()

accounsPayableRoutes.post('', createAccountsPayableController.handle)
accounsPayableRoutes.post('/fixed', createFixedAccountsPayableController.handle)

export { accounsPayableRoutes }
