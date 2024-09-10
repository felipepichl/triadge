import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'

import { IFinancialCategoryRepository } from '../IFinancialCategoryRepository'

class FinancialCategoryRepositoryInMemory
  implements IFinancialCategoryRepository
{
  private financialCategory: FinancialCategory[] = []

  async create(financialCategory: FinancialCategory): Promise<void> {
    this.financialCategory.push(financialCategory)
  }

  async listAll(): Promise<FinancialCategory[]> {
    return this.financialCategory
  }

  async findByDescription(description: string): Promise<FinancialCategory> {
    return this.financialCategory.find(
      (financialCategory) => financialCategory.description === description,
    )
  }

  async findById(id: string): Promise<FinancialCategory> {
    return this.financialCategory.find(
      (financialCategory) => financialCategory.id.toString() === id,
    )
  }
}

export { FinancialCategoryRepositoryInMemory }
