import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository'
import { PrismaSingleton } from '@shared/infra/prisma'

import { TransactionMappers } from '../../mappers/transaction/TransactionMappers'

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

  async listAll(): Promise<Transaction[]> {
    const result = await PrismaSingleton.getInstance().transaction.findMany()

    return TransactionMappers.getMapper().toDomainArray(result)
  }

  async findById(id: string): Promise<Transaction> {
    const result = await PrismaSingleton.getInstance().transaction.findFirst({
      where: { id },
    })

    return TransactionMappers.getMapper().toDomain(result)
  }

  async findByDescription(description: string): Promise<Transaction> {
    const result = await PrismaSingleton.getInstance().transaction.findFirst({
      where: { description },
    })

    return TransactionMappers.getMapper().toDomain(result)
  }

  async findByDate(date: Date): Promise<Transaction> {
    const result = await PrismaSingleton.getInstance().transaction.findFirst({
      where: { date },
    })

    return TransactionMappers.getMapper().toDomain(result)
  }

  async findByMonth(month: number): Promise<Transaction[]> {
    const year = new Date().getFullYear()
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)

    const result = await PrismaSingleton.getInstance().transaction.findMany({
      where: {
        AND: [{ date: { gte: startDate } }, { date: { lte: endDate } }],
      },
    })

    return TransactionMappers.getMapper().toDomainArray(result)
  }
}

export { TransactionsRepository }
