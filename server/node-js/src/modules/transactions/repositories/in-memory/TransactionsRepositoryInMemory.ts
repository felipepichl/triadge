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

  async findByDescription(description: string): Promise<Transaction> {
    const transaction = this.transactions.find(
      (transaction) => transaction.description === description,
    )

    return transaction
  }

  async findByDate(date: Date): Promise<Transaction> {
    const transaction = this.transactions.find(
      (transaction) => transaction.date === date,
    )

    return transaction
  }

  async findByMonth(month: number): Promise<Transaction[]> {
    return this.transactions.filter((transaction) => {
      return transaction.date.getMonth() + 1 === month
    })
  }
}

export { TransactionsRepository }
