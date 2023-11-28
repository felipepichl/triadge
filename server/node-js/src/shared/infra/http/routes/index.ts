import { Router } from 'express'

import { authenticateRoutes } from '@modules/accounts/infra/http/routes/authenticate.routes'
import { usersRouter } from '@modules/accounts/infra/http/routes/users.routes'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', authenticateRoutes)

routes.use(ensureAuthenticated)

// authenticated routes

export { routes }
