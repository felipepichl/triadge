import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType'

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

  async listByMonth(userId: string, month: number): Promise<Transaction[]> {
    return this.transactions.filter((transaction) => {
      return (
        transaction.userId === userId &&
        transaction.date.getMonth() + 1 === month
      )
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
        transaction.userId === userId &&
        transaction.date >= startDate &&
        transaction.date <= endDate,
    )
  }

  async listByType(
    userId: string,
    type: ITransactionType,
  ): Promise<Transaction[]> {
    return this.transactions.filter(
      (transaction) =>
        transaction.userId === userId && transaction.type === type.type,
    )
  }
}

export { TransactionsRepositoryInMemory }
