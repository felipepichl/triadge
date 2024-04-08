import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'

import { ITransactionCategoriesRepository } from '../ITransactionCategoriesRepository'

class TransactionCategoriesRepositoryInMemory
  implements ITransactionCategoriesRepository
{
  private transactionCategories: TransactionCategory[] = []

  async create(category: TransactionCategory): Promise<void> {
    this.transactionCategories.push(category)
  }

  async listAll(): Promise<TransactionCategory[]> {
    return this.transactionCategories
  }

  async findByDescription(description: string): Promise<TransactionCategory> {
    const category = this.transactionCategories.find(
      (category) => category.description === description,
    )

    return category
  }
}

export { TransactionCategoriesRepositoryInMemory }
