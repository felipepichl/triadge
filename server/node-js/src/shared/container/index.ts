import '@modules/accounts/providers'
import './providers'

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { FinancialCategoryRepository } from '@modules/financialCategory/infra/prisma/repositories/FinancialCategoryRepository'
import { IFinancialCategoryRepository } from '@modules/financialCategory/repositories/IFinancialCategoryRepository'
import { CategoriesRepository } from '@modules/products/infra/prisma/repositories/category/CategoriesRepository'
import { ICategoryRepositry } from '@modules/products/repositories/category/ICategoryRepository'
import { TransactionsRepository } from '@modules/transactions/infra/prisma/repositories/transaction/TransactionsRepository'
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository'
import { container } from 'tsyringe'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
)

container.registerSingleton<ICategoryRepositry>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
)

container.registerSingleton<IFinancialCategoryRepository>(
  'FinancialCategoriesRepoitory',
  FinancialCategoryRepository,
)
