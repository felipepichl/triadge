import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'

interface IFinancialCategoriesRepository {
  create(financialCategory: FinancialCategory): Promise<void>
  listAllCategoriesByUser(userId: string): Promise<FinancialCategory[]>
  listSubcategoriesByCategoryId(
    userId: string,
    parentCategoryId: string,
  ): Promise<FinancialCategory[]>
  findByDescription(description: string): Promise<FinancialCategory>
  findByDescriptionAndParentCategory(
    description: string,
    parentCategoryId: string,
  ): Promise<FinancialCategory>
  findById(id: string): Promise<FinancialCategory>
}

export { IFinancialCategoriesRepository }
