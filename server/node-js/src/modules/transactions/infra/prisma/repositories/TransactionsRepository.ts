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
  }: Transaction): Promise<void> {
    const transaction = Transaction.createTransaction({
      description,
      detail,
      type,
      value,
    })

    const data = TransactionMappers.getMapper().toPersistence(transaction)

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
