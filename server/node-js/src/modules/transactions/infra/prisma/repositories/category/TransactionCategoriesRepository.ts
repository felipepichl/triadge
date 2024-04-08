import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'
import { ITransactionCategoriesRepository } from '@modules/transactions/repositories/category/ITransactionCategoriesRepository'
import { PrismaSingleton } from '@shared/infra/prisma'

import { TransactionCategoryMappers } from '../../mappers/category/TransactionCategoryMappers'

class TransactionCategoriesRepository
  implements ITransactionCategoriesRepository
{
  async create({ id, description }: TransactionCategory): Promise<void> {
    const data = {
      description,
    }

    await PrismaSingleton.getInstance().transactionCategory.upsert({
      where: { id: id.toString() },
      create: data,
      update: data,
    })
  }

  async listAll(): Promise<TransactionCategory[]> {
    const result =
      await PrismaSingleton.getInstance().transactionCategory.findMany()

    return TransactionCategoryMappers.getMApper().toDomainArray(result)
  }

  async findByDescription(description: string): Promise<TransactionCategory> {
    const result =
      await PrismaSingleton.getInstance().transactionCategory.findFirst({
        where: { description },
      })

    if (!result) {
      return null
    }

    return TransactionCategoryMappers.getMApper().toDomain(result)
  }
}

export { TransactionCategoriesRepository }
