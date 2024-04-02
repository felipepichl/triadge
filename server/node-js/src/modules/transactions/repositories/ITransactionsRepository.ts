import { Transaction } from '../domain/Transaction'

interface ITransactionsRepository {
  create(transaction: Transaction): Promise<void>
  listAll(): Promise<Transaction[]>
  findByName(name: string): Promise<Transaction>
  findByDate(date: Date): Promise<Transaction>
  findByMonth(month: string): Promise<Transaction[]>
}

export { ITransactionsRepository }
