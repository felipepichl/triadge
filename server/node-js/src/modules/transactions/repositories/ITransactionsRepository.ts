import { Transaction } from '../domain/Transaction'

interface ITransactionsRepository {
  create(transaction: Transaction): Promise<void>
  listAll(): Promise<Transaction[]>
  findByDescription(description: string): Promise<Transaction>
  findByDate(date: Date): Promise<Transaction>
  findByMonth(month: number): Promise<Transaction[]>
}

export { ITransactionsRepository }
