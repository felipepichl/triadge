import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository'
import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType'
import { TransactionMappers } from '@modules/transactions/infra/prisma/mappers/transaction/TransactionMappers'
import { PrismaSingleton } from '@shared/infra/prisma'

import { FinancialCategoryMappers } from '../mappers/FinancialCategoryMappers'

class FinancialCategoriesRepository implements IFinancialCategoriesRepository {
  async create({
    id,
    description,
    parentCategoryId,
    userId,
  }: FinancialCategory): Promise<void> {
    const data = {
      description,
      parentCategoryId: parentCategoryId || null,
      userId,
    }

    PrismaSingleton.getInstance().financialCategory.findMany({
      where: { userId },
    })

    await PrismaSingleton.getInstance().financialCategory.upsert({
      where: { id: id.toString() },
      create: data,
      update: data,
    })
  }

  async listAllCategoriesByUser(userId: string): Promise<FinancialCategory[]> {
    const result =
      await PrismaSingleton.getInstance().financialCategory.findMany({
        where: { parentCategoryId: null, userId },
      })

    return FinancialCategoryMappers.getMapper().toDomainArray(result)
  }

  async listSubcategoriesByCategoryId(
    userId: string,
    parentCategoryId: string,
  ): Promise<FinancialCategory[]> {
    const result =
      await PrismaSingleton.getInstance().financialCategory.findMany({
        where: { userId, parentCategoryId },
      })

    return FinancialCategoryMappers.getMapper().toDomainArray(result)
  }

  async listFinancialCategoriesWithTransactionsByType(
    userId: string,
    type: ITransactionType,
    month: number,
  ): Promise<
    Array<{
      financialCategory: FinancialCategory
      financialCategoryTransactions: Transaction[]
    }>
  > {
    const year = new Date().getFullYear()

    const financialCategoriesWithTransactions =
      await PrismaSingleton.getInstance().transaction.groupBy({
        by: ['financialCategoryId'],
        where: {
          userId,
          type: type.type,
          date: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
          },
        },
        _count: {
          financialCategoryId: true,
        },
      })

    const categoryIds = financialCategoriesWithTransactions.map(
      (transaction) => transaction.financialCategoryId,
    )

    const financialCategories =
      await PrismaSingleton.getInstance().financialCategory.findMany({
        where: {
          id: {
            in: categoryIds,
          },
        },
        include: {
          transactions: {
            where: {
              type: type.type,
              date: {
                gte: new Date(year, month - 1, 1),
                lt: new Date(year, month, 1),
              },
            },
          },
        },
      })

    return financialCategories.map((category) => ({
      financialCategory:
        FinancialCategoryMappers.getMapper().toDomain(category),
      financialCategoryTransactions:
        TransactionMappers.getMapper().toDomainArray(category.transactions),
    }))
  }

  async findByDescription(description: string): Promise<FinancialCategory> {
    const result =
      await PrismaSingleton.getInstance().financialCategory.findFirst({
        where: { description },
      })

    if (!result) {
      return null
    }

    return FinancialCategoryMappers.getMapper().toDomain(result)
  }

  async findByDescriptionAndParentCategory(
    description: string,
    parentCategoryId: string,
  ): Promise<FinancialCategory> {
    const result =
      await PrismaSingleton.getInstance().financialCategory.findFirst({
        where: { description, parentCategoryId },
      })

    if (!result) {
      return null
    }

    return FinancialCategoryMappers.getMapper().toDomain(result)
  }

  async findById(id: string): Promise<FinancialCategory> {
    const result =
      await PrismaSingleton.getInstance().financialCategory.findFirst({
        where: { id },
      })

    if (!result) {
      return null
    }

    return FinancialCategoryMappers.getMapper().toDomain(result)
  }
}

export { FinancialCategoriesRepository }
