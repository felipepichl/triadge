import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'

import { IFinancialCategoriesRepository } from '../IFinancialCategoriesRepository'

class FinancialCategoriesRepositoryInMemory
  implements IFinancialCategoriesRepository
{
  private financialCategories: FinancialCategory[] = []

  async create(financialCategory: FinancialCategory): Promise<void> {
    this.financialCategories.push(financialCategory)
  }

  async listAllCategoriesByUser(userId: string): Promise<FinancialCategory[]> {
    return this.financialCategories.filter(
      (financialCategory) => financialCategory.userId === userId,
    )
  }

  async listSubcategoriesByCategoryId(
    userId: string,
    parentCategoryId: string,
  ): Promise<FinancialCategory[]> {
    return this.financialCategories.filter(
      (financialCategory) =>
        financialCategory.userId === userId &&
        financialCategory.parentCategoryId === parentCategoryId,
    )
  }

  async findByDescription(description: string): Promise<FinancialCategory> {
    return this.financialCategories.find(
      (financialCategory) => financialCategory.description === description,
    )
  }

  async findByDescriptionAndParentCategory(
    description: string,
    parentCategoryId: string,
  ): Promise<FinancialCategory> {
    return this.financialCategories.find(
      (financialCategory) =>
        financialCategory.description === description &&
        financialCategory.parentCategoryId === parentCategoryId,
    )
  }

  async findById(id: string): Promise<FinancialCategory> {
    return this.financialCategories.find(
      (financialCategory) => financialCategory.id.toString() === id,
    )
  }
}

export { FinancialCategoriesRepositoryInMemory }
