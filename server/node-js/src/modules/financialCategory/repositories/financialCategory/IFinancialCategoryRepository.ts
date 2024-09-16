import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'

interface IFinancialCategoryRepository {
  create(financialCategory: FinancialCategory): Promise<void>
  listAll(): Promise<FinancialCategory[]>
  findByDescription(description: string): Promise<FinancialCategory>
  findById(id: string): Promise<FinancialCategory>
}

export { IFinancialCategoryRepository }
