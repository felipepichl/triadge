import { accounsPayableRoutes } from '@modules/accountPayable/infra/http/routes/accountPayable.routes'
import { authenticateRoutes } from '@modules/accounts/infra/http/routes/authenticate.routes'
import { passwordRoutes } from '@modules/accounts/infra/http/routes/passoword.routes'
import { refreshTokenRoutes } from '@modules/accounts/infra/http/routes/refreshToken.routes'
import { usersRouter } from '@modules/accounts/infra/http/routes/users.routes'
import { financialCategoryRoutes } from '@modules/financialCategory/infra/http/routes/financialCategory.routes'
import { categoriesRoutes } from '@modules/products/infra/http/routes/category/categories.routes'
import { stocksRoutes } from '@modules/stock/infra/http/routes/stocks.routes'
import { transactionsRoutes } from '@modules/transactions/infra/http/routes/transaction/transaction.routes'
import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', authenticateRoutes)

routes.use('/refresh-token', refreshTokenRoutes)
routes.use('/password', passwordRoutes)

routes.use(ensureAuthenticated)

routes.use('/categories', categoriesRoutes)

routes.use('/financial-category', financialCategoryRoutes)
routes.use('/transactions', transactionsRoutes)
routes.use('/accounts-payable', accounsPayableRoutes)
routes.use('/stocks', stocksRoutes)

export { routes }
