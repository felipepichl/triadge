import { validateRequest } from '@shared/infra/http/middlewares/validateRequest'
import { Router } from 'express'

import { AuthenticateUserController } from '../controllers/authenticateUser/AuthenticateUserController'
import { authenticateUserSchema } from '../schemas/accountSchemas'

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post(
  '',
  validateRequest({ body: authenticateUserSchema }),
  authenticateUserController.handle,
)

export { authenticateRoutes }
