import { Router } from 'express'

import { RefreshTokenController } from '../controllers/refreshToken/RefreshTokenController'

const refreshTokenRoutes = Router()

const refreshTokenController = new RefreshTokenController()

refreshTokenRoutes.patch('', refreshTokenController.handle)

export { refreshTokenRoutes }
