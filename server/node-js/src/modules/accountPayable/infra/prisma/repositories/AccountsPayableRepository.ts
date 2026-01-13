import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { PrismaSingleton } from '@shared/infra/prisma'
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns'

import { AccountPayableMappers } from '../mappers/AccountPayableMappers'

/**
 * Helper function to get start and end dates for a given month
 * Normalizes dates to avoid timezone issues
 */
function getMonthDateRange(
  month: number,
  year: number,
): { startDate: Date; endDate: Date } {
  const monthDate = new Date(year, month - 1, 1)
  const startDate = startOfMonth(monthDate)
  const endDate = endOfMonth(monthDate)

  return { startDate, endDate }
}

class AccountsPayableRepository implements IAccountsPayableRepository {
  async create({
    id,
    description,
    amount,
    dueDate,
    paymentDate,
    isPaid,
    isFixed,
    userId,
    financialCategoryId,
    subcategoryId,
  }: AccountPayable): Promise<void> {
    const data = {
      description,
      amount,
      dueDate,
      paymentDate,
      isPaid,
      isFixed,
      userId,
      financialCategoryId,
      subcategoryId: subcategoryId || null,
    }

    await PrismaSingleton.getInstance().accountPayable.upsert({
      where: { id: id.toString() },
      create: data,
      update: data,
    })
  }

  async createMany(accounts: AccountPayable[]): Promise<void> {
    if (!accounts || accounts.length === 0) {
      return
    }

    const data = accounts.map(
      ({
        description,
        amount,
        dueDate,
        paymentDate,
        isPaid,
        isFixed,
        userId,
        financialCategoryId,
        subcategoryId,
      }) => ({
        description,
        amount,
        dueDate,
        paymentDate,
        isPaid,
        isFixed,
        userId,
        financialCategoryId,
        subcategoryId: subcategoryId || null,
      }),
    )

    await PrismaSingleton.getInstance().accountPayable.createMany({
      data,
      skipDuplicates: true,
    })
  }

  async update({
    id,
    description,
    amount,
    dueDate,
    paymentDate,
    isPaid,
    isFixed,
    interestPaid,
    isInterestPaid,
    userId,
    financialCategoryId,
    subcategoryId,
  }: AccountPayable): Promise<void> {
    await PrismaSingleton.getInstance().accountPayable.update({
      where: { id: id.toString() },
      data: {
        description,
        amount,
        dueDate,
        paymentDate,
        isPaid,
        isFixed,
        interestPaid,
        isInterestPaid,
        userId,
        financialCategoryId,
        subcategoryId,
      },
    })
  }

  async listAll(
    userId: string,
    page: number = 1,
    pageSize: number = 50,
  ): Promise<AccountPayable[]> {
    const skip = (page - 1) * pageSize

    const result = await PrismaSingleton.getInstance().accountPayable.findMany({
      where: { userId },
      select: {
        id: true,
        description: true,
        amount: true,
        dueDate: true,
        paymentDate: true,
        isPaid: true,
        isFixed: true,
        userId: true,
        financialCategoryId: true,
      },
      skip,
      take: pageSize,
      orderBy: { dueDate: 'desc' },
    })

    return AccountPayableMappers.getMapper().toDomainArray(result)
  }

  async listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AccountPayable[]> {
    const normalizedStartDate = startOfDay(startDate)
    const normalizedEndDate = endOfDay(endDate)

    const result = await PrismaSingleton.getInstance().accountPayable.findMany({
      where: {
        userId,
        dueDate: { gte: normalizedStartDate, lte: normalizedEndDate },
      },
      select: {
        id: true,
        description: true,
        amount: true,
        dueDate: true,
        paymentDate: true,
        isPaid: true,
        isFixed: true,
        userId: true,
        financialCategoryId: true,
        subcategoryId: true,
        financialCategory: {
          select: {
            id: true,
            description: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    })

    return AccountPayableMappers.getMapper().toDomainArray(result)
  }

  async listAllFixedAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    const year = new Date().getFullYear()
    const { startDate, endDate } = getMonthDateRange(month, year)

    const result = await PrismaSingleton.getInstance().accountPayable.findMany({
      where: {
        userId,
        dueDate: { gte: startDate, lte: endDate },
        isFixed: true,
      },
      select: {
        id: true,
        description: true,
        amount: true,
        dueDate: true,
        paymentDate: true,
        isPaid: true,
        isFixed: true,
        userId: true,
        financialCategoryId: true,
        financialCategory: {
          select: {
            id: true,
            description: true,
          },
        },
      },
      orderBy: { dueDate: 'desc' },
    })

    return AccountPayableMappers.getMapper().toDomainArray(result)
  }

  async listAllUnfixedAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    const year = new Date().getFullYear()
    const { startDate, endDate } = getMonthDateRange(month, year)

    const result = await PrismaSingleton.getInstance().accountPayable.findMany({
      where: {
        userId,
        dueDate: { gte: startDate, lte: endDate },
        isFixed: false,
      },
      select: {
        id: true,
        description: true,
        amount: true,
        dueDate: true,
        paymentDate: true,
        isPaid: true,
        isFixed: true,
        userId: true,
        financialCategoryId: true,
        financialCategory: {
          select: {
            id: true,
            description: true,
          },
        },
      },
      orderBy: { dueDate: 'desc' },
    })

    return AccountPayableMappers.getMapper().toDomainArray(result)
  }

  async listAllUnpaidAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    const year = new Date().getFullYear()
    const { startDate, endDate } = getMonthDateRange(month, year)

    const result = await PrismaSingleton.getInstance().accountPayable.findMany({
      where: {
        userId,
        dueDate: { gte: startDate, lte: endDate },
        isPaid: false,
      },
      select: {
        id: true,
        description: true,
        amount: true,
        dueDate: true,
        paymentDate: true,
        isPaid: true,
        isFixed: true,
        userId: true,
        financialCategoryId: true,
        financialCategory: {
          select: {
            id: true,
            description: true,
          },
        },
      },
      orderBy: { dueDate: 'desc' },
    })

    return AccountPayableMappers.getMapper().toDomainArray(result)
  }

  async listAllPaidAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    const year = new Date().getFullYear()
    const { startDate, endDate } = getMonthDateRange(month, year)

    const result = await PrismaSingleton.getInstance().accountPayable.findMany({
      where: {
        userId,
        dueDate: { gte: startDate, lte: endDate },
        isPaid: true,
      },
      select: {
        id: true,
        description: true,
        amount: true,
        dueDate: true,
        paymentDate: true,
        isPaid: true,
        isFixed: true,
        userId: true,
        financialCategoryId: true,
        financialCategory: {
          select: {
            id: true,
            description: true,
          },
        },
      },
      orderBy: { dueDate: 'desc' },
    })

    return AccountPayableMappers.getMapper().toDomainArray(result)
  }

  async findById(accountPayableId: string): Promise<AccountPayable> {
    const result =
      await PrismaSingleton.getInstance().accountPayable.findUnique({
        where: { id: accountPayableId },
      })

    return AccountPayableMappers.getMapper().toDomain(result)
  }

  async markAccountAsPaid(accountPayableId: string): Promise<void> {
    await PrismaSingleton.getInstance().accountPayable.update({
      where: { id: accountPayableId },
      data: { isPaid: true },
    })
  }
}

export { AccountsPayableRepository }
