import { Transaction } from '../../domain/transaction/Transaction'

interface ITransactionsRepository {
  create(transaction: Transaction): Promise<void>
  listAll(): Promise<Transaction[]>
  findById(id: string): Promise<Transaction>
  findByDescription(description: string): Promise<Transaction>
  findByDate(date: Date): Promise<Transaction>
  findByMonth(month: number): Promise<Transaction[]>
  findByUser(userId: string): Promise<Transaction[]>
}

export { ITransactionsRepository }
