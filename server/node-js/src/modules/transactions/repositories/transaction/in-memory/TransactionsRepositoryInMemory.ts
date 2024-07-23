import { Transaction } from '@modules/transactions/domain/transaction/Transaction'

import { ITransactionsRepository } from '../ITransactionsRepository'

class TransactionsRepositoryInMemory implements ITransactionsRepository {
  private transactions: Transaction[] = []

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction)
  }

  async listAll(): Promise<Transaction[]> {
    return this.transactions
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = this.transactions.find(
      (transaction) => transaction.id.toString() === id,
    )

    return transaction
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

  async findByUser(userId: string): Promise<Transaction[]> {
    // console.log('IN', userId)
    // console.log('IN', this.transactions)

    return this.transactions.filter(
      (transaction) => transaction.userId === userId,
    )
  }

  async listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Transaction[]> {
    return this.transactions.filter(
      (transaction) =>
        // transaction.id.toString() === userId &&
        transaction.date >= startDate && transaction.date <= endDate,
    )
  }
}

export { TransactionsRepositoryInMemory }
