import { Router } from 'express'

import { CreateAccountsPayableController } from '../controllers/createAccountsPayable/CreateAccountsPayableController'

const accounsPayableRoutes = Router()

const createAccountsPayableController = new CreateAccountsPayableController()

accounsPayableRoutes.post('', createAccountsPayableController.handle)

export { accounsPayableRoutes }
