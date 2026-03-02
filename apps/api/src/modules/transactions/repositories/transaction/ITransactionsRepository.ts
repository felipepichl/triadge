import { Transaction } from '../../domain/transaction/Transaction'
import { ITransactionType } from '../../domain/transaction/TransactionType'

interface ITransactionsRepository {
  create(transaction: Transaction): Promise<void>
  listAll(): Promise<Transaction[]>
  listByMonth(userId: string, month: number): Promise<Transaction[]>
  listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Transaction[]>
  listByType(userId: string, type: ITransactionType): Promise<Transaction[]>
  listByUser(userId: string): Promise<Transaction[]>
  listByCategoryAndTypeAndMonth(
    financialCategoryId: string,
    type: ITransactionType,
    month: number,
  ): Promise<Transaction[]>
  findById(id: string): Promise<Transaction>
  findByDescription(description: string): Promise<Transaction>
  findByDate(date: Date): Promise<Transaction>
}

export { ITransactionsRepository }
