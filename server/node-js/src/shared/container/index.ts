import '@modules/accounts/providers'
import './providers'

import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { CategoriesRepository } from '@modules/products/infra/prisma/repositories/category/CategoriesRepository'
import { ICategoryRepositry } from '@modules/products/repositories/category/ICategoryRepository'
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
