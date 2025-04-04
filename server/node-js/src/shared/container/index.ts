import '@modules/accounts/providers'
import '@modules/stock/providers'
import './providers'

import { AccountsPayableRepository } from '@modules/accountPayable/infra/prisma/repositories/AccountsPayableRepository'
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { FinancialCategoriesRepository } from '@modules/financialCategory/infra/prisma/repositories/FinancialCategoriesRepository'
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository'
import { CategoriesRepository } from '@modules/products/infra/prisma/repositories/category/CategoriesRepository'
import { ICategoryRepositry } from '@modules/products/repositories/category/ICategoryRepository'
import { StockRepository } from '@modules/stock/infra/prisma/repositories/StockRepository'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
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

container.registerSingleton<IFinancialCategoriesRepository>(
  'FinancialCategoriesRepository',
  FinancialCategoriesRepository,
)

container.registerSingleton<IAccountsPayableRepository>(
  'AccountsPayableRepository',
  AccountsPayableRepository,
)

container.registerSingleton<IStockRepository>(
  'StockRepository',
  StockRepository,
)
