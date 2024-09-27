import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType'
import { ITransactionsRepository } from '@modules/transactions/repositories/transaction/ITransactionsRepository'
import { PrismaSingleton } from '@shared/infra/prisma'
import { endOfDay, startOfDay } from 'date-fns'

import { TransactionMappers } from '../../mappers/transaction/TransactionMappers'

class TransactionsRepository implements ITransactionsRepository {
  async create({
    id,
    description,
    detail,
    type,
    date,
    value,
    userId,
    financialCategoryId,
  }: Transaction): Promise<void> {
    const data = {
      description,
      detail,
      date,
      type,
      value,
      userId,
      financialCategoryId,
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

  async listByMonth(userId: string, month: number): Promise<Transaction[]> {
    const year = new Date().getFullYear()
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)

    const result = await PrismaSingleton.getInstance().transaction.findMany({
      where: {
        userId,
        AND: [{ date: { gte: startDate } }, { date: { lte: endDate } }],
      },
    })

    return TransactionMappers.getMapper().toDomainArray(result)
  }

  async findByUser(userId: string): Promise<Transaction[]> {
    const result = await PrismaSingleton.getInstance().transaction.findMany({
      where: { userId },
      // include: { transactionCategory: true },
    })

    return TransactionMappers.getMapper().toDomainArray(result)
  }

  async listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Transaction[]> {
    const normalizedStartDate = startOfDay(startDate)
    const normalizedEndDate = endOfDay(endDate)

    const result = await PrismaSingleton.getInstance().transaction.findMany({
      where: {
        userId,
        date: { gte: normalizedStartDate, lte: normalizedEndDate },
      },
      // include: { transactionCategory: true },
    })

    return TransactionMappers.getMapper().toDomainArray(result)
  }

  async listByType(
    userId: string,
    type: ITransactionType,
  ): Promise<Transaction[]> {
    const result = await PrismaSingleton.getInstance().transaction.findMany({
      where: {
        userId,
        type: type.type,
      },
      // include: { transactionCategory: true },
    })

    return TransactionMappers.getMapper().toDomainArray(result)
  }

  listByCategoryAndTypeAndMonth(
    financialCategoryId: string,
    type: ITransactionType,
    month: number,
  ): Promise<Transaction[]> {
    throw new Error('Method not implemented.')
  }
}

export { TransactionsRepository }
