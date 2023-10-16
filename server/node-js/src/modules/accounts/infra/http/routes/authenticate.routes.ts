import { Router } from 'express'

import { AuthenticateUserController } from '../controllers/authenticateUser/AuthenticateUserController'

const authenticateRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRoutes.post('', authenticateUserController.handle)

export { authenticateRoutes }
