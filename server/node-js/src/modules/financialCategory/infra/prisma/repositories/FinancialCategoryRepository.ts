import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoryRepository } from '@modules/financialCategory/repositories/IFinancialCategoryRepository'
import { PrismaSingleton } from '@shared/infra/prisma'

import { FinancialCategoryMappers } from '../mappers/FinancialCategoryMappers'

class FinancialCategoryRepository implements IFinancialCategoryRepository {
  async create({
    id,
    description,
    parentCategoryId,
  }: FinancialCategory): Promise<void> {
    const data = {
      description,
      parentCategoryId: parentCategoryId || null,
    }

    await PrismaSingleton.getInstance().financialCategory.upsert({
      where: { id: id.toString() },
      create: data,
      update: data,
    })
  }

  async listAll(): Promise<FinancialCategory[]> {
    const result =
      await PrismaSingleton.getInstance().financialCategory.findMany({
        where: { parentCategoryId: null },
      })

    return FinancialCategoryMappers.getMapper().toDomainArray(result)
  }

  async listSubcategories(
    parentCategoryId: string,
  ): Promise<FinancialCategory[]> {
    const result =
      await PrismaSingleton.getInstance().financialCategory.findMany({
        where: { parentCategoryId },
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

export { FinancialCategoryRepository }