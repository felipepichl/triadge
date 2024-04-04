import { Transaction } from '@modules/transactions/domain/Transaction'
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository'

import { PrismaSingleton } from '@shared/infra/prisma'

import { TransactionMappers } from '../mappers/TransactionMappers'

class TransactionsRepository implements ITransactionsRepository {
  async create({
    id,
    description,
    detail,
    type,
    value,
    userId,
    transactionCategoryId,
  }: Transaction): Promise<void> {
    const data = {
      description,
      detail,
      type,
      value,
      userId,
      transactionCategoryId,
    }

    await PrismaSingleton.getInstance().transaction.upsert({
      where: { id: id.toString() },
      create: data,
      update: data,
    })
  }

  listAll(): Promise<Transaction[]> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Transaction> {
    throw new Error('Method not implemented.')
  }

  findByDescription(description: string): Promise<Transaction> {
    throw new Error('Method not implemented.')
  }

  findByDate(date: Date): Promise<Transaction> {
    throw new Error('Method not implemented.')
  }

  findByMonth(month: number): Promise<Transaction[]> {
    throw new Error('Method not implemented.')
  }
}

export { TransactionsRepository }
