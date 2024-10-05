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

  async listByMonth(userId: string, month: number): Promise<Transaction[]> {
    return this.transactions.filter((transaction) => {
      return (
        transaction.userId === userId &&
        transaction.date.getUTCMonth() + 1 === month
      )
    })
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

  async listByUser(userId: string): Promise<Transaction[]> {
    return this.transactions.filter(
      (transaction) => transaction.userId === userId,
    )
  }

  async listByCategoryAndTypeAndMonth(
    financialCategoryId: string,
    type: ITransactionType,
    month: number,
  ): Promise<Transaction[]> {
    return this.transactions.filter((transaction) => {
      return (
        transaction.financialCategoryId === financialCategoryId &&
        transaction.type === type.type &&
        transaction.date.getUTCMonth() + 1 === month
      )
    })
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
}

export { TransactionsRepositoryInMemory }
