import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { IAccountsPayableRepository } from '@modules/accountPayable/repositories/IAccountsPayableRepository'
import { PrismaSingleton } from '@shared/infra/prisma'
import { endOfDay, startOfDay } from 'date-fns'

import { AccountPayableMappers } from '../mappers/AccountPayableMappers'

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
        subcategoryId,
      }),
    )

    await PrismaSingleton.getInstance().accountPayable.createMany({
      data,
    })
  }

  async listAll(userId: string): Promise<AccountPayable[]> {
    const result = await PrismaSingleton.getInstance().accountPayable.findMany({
      where: { userId },
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
      include: { financialCategory: true, subcategory: true },
    })

    return AccountPayableMappers.getMapper().toDomainArray(result)
  }

  async listAllFixedAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    const year = new Date().getFullYear()
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)

    const result = await PrismaSingleton.getInstance().accountPayable.findMany({
      where: {
        userId,
        AND: [{ dueDate: { gte: startDate } }, { dueDate: { lte: endDate } }],
        isFixed: true,
      },
    })

    return AccountPayableMappers.getMapper().toDomainArray(result)
  }

  listAllUnfixedAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    throw new Error('Method not implemented.')
  }

  listAllUnpaidAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    throw new Error('Method not implemented.')
  }

  listAllPaidAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    throw new Error('Method not implemented.')
  }

  async markAccountAsPaid(accountPayableId: string): Promise<void> {
    await PrismaSingleton.getInstance().accountPayable.update({
      where: { id: accountPayableId },
      data: { isPaid: true },
    })
  }
}

export { AccountsPayableRepository }
