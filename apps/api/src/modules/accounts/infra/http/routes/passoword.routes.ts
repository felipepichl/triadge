import { validateRequest } from '@shared/infra/http/middlewares/validateRequest'
import { Router } from 'express'

import { SendForgotPasswordMailController } from '../controllers/sendForgotPasswordMail/SendForgotPasswordMailController'
import { forgotPasswordSchema } from '../schemas/accountSchemas'

const passwordRoutes = Router()

const sendForgotPasswordMail = new SendForgotPasswordMailController()

passwordRoutes.post(
  '/forgot',
  validateRequest({ body: forgotPasswordSchema }),
  sendForgotPasswordMail.handle,
)

export { passwordRoutes }
