import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'

interface ITransactionCategoriesRepository {
  create(transactionCategory: TransactionCategory): Promise<void>
  listAll(): Promise<TransactionCategory[]>
  findByDescription(description: string): Promise<TransactionCategory>
}

export { ITransactionCategoriesRepository }
