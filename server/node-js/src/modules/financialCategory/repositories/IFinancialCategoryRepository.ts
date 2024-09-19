import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'

interface IFinancialCategoryRepository {
  create(financialCategory: FinancialCategory): Promise<void>
  listAll(): Promise<FinancialCategory[]>
  listSubcategories(parentCategoryId: string): Promise<FinancialCategory[]>
  findByDescription(description: string): Promise<FinancialCategory>
  findByDescriptionAndParentCategory(
    description: string,
    parentCategoryId: string,
  ): Promise<FinancialCategory>
  findById(id: string): Promise<FinancialCategory>
}

export { IFinancialCategoryRepository }
