import { Transaction } from '../../domain/transaction/Transaction'
import { ITransactionType } from '../../domain/transaction/TransactionType'

interface ITransactionsRepository {
  create(transaction: Transaction): Promise<void>
  listAll(): Promise<Transaction[]>
  findById(id: string): Promise<Transaction>
  findByDescription(description: string): Promise<Transaction>
  findByDate(date: Date): Promise<Transaction>
  listByMonth(month: number): Promise<Transaction[]>
  findByUser(userId: string): Promise<Transaction[]>
  listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Transaction[]>
  listByType(userId: string, type: ITransactionType): Promise<Transaction[]>
}

export { ITransactionsRepository }
