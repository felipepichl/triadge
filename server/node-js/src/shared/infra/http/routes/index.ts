import { Router } from 'express'

import { usersRouter } from '@modules/accounts/infra/http/routes/users.routes'
import { authenticateRoutes } from '@modules/accounts/infra/http/routes/authenticate.routes'
import { refreshTokenRoutes } from '@modules/accounts/infra/http/routes/refreshToken.routes'
import { passwordRoutes } from '@modules/accounts/infra/http/routes/passoword.routes'

import { categoriesRoutes } from '@modules/products/infra/http/routes/category/categories.routes'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', authenticateRoutes)

routes.use('/refresh-token', refreshTokenRoutes)
routes.use('/password', passwordRoutes)

routes.use(ensureAuthenticated)

routes.use('/categories', categoriesRoutes)

export { routes }
