import { Transaction } from '@modules/transactions/domain/Transaction'
import { ITransactionsRepository } from '../ITransactionsRepository'

class TransactionsRepository implements ITransactionsRepository {
  private transactions: Transaction[] = []

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction)
  }

  async listAll(): Promise<Transaction[]> {
    return this.transactions
  }

  async findByName(name: string): Promise<Transaction> {
    const transaction = this.transactions.find(
      (transaction) => transaction.description === name,
    )

    return transaction
  }

  async findByDate(date: Date): Promise<Transaction> {
    const transaction = this.transactions.find(
      (transaction) => transaction.date === date,
    )

    return transaction
  }

  findByMonth(month: string): Promise<Transaction[]> {
    throw new Error('Method not implemented.')
  }
}

export { TransactionsRepository }
