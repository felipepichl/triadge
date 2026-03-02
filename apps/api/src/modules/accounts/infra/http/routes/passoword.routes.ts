import { Router } from 'express'

import { SendForgotPasswordMailController } from '../controllers/sendForgotPasswordMail/SendForgotPasswordMailController'

const passwordRoutes = Router()

const sendForgotPasswordMail = new SendForgotPasswordMailController()

passwordRoutes.post('/forgot', sendForgotPasswordMail.handle)

export { passwordRoutes }
