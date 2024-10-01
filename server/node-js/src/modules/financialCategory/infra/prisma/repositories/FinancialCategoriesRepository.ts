import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository'
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
        where: { parentCategoryId, userId },
      })

    return FinancialCategoryMappers.getMapper().toDomainArray(result)
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
