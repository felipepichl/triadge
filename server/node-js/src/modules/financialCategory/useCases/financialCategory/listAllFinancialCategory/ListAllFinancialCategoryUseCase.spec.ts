import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategoryRepositoryInMemory } from '@modules/financialCategory/repositories/financialCategory/in-memory/FinancialCategoryRepositoryInMemory'

import { ListAllFinancialCategoryUseCase } from './ListAllFinancialCategoryUseCase'

let financialCategoryRepositoryInMemory: FinancialCategoryRepositoryInMemory
let listAllFinancialCategoryUseCase: ListAllFinancialCategoryUseCase

describe('[FinancialCategory] - List all financial categories', () => {
  beforeEach(() => {
    financialCategoryRepositoryInMemory =
      new FinancialCategoryRepositoryInMemory()

    listAllFinancialCategoryUseCase = new ListAllFinancialCategoryUseCase(
      financialCategoryRepositoryInMemory,
    )
  })

  it('should be able to list all financial categories', async () => {
    const financialCategory1 = FinancialCategory.createFinancialCategory({
      description: 'Description Financial Category 1',
    })

    const financialCategory2 = FinancialCategory.createFinancialCategory({
      description: 'Description Financial Category 2',
    })

    await financialCategoryRepositoryInMemory.create(financialCategory1)
    await financialCategoryRepositoryInMemory.create(financialCategory2)

    const { id: financialCategoryId1 } = financialCategory1
    const { id: financialCategoryId2 } = financialCategory1

    const result = await listAllFinancialCategoryUseCase.execute()

    expect(result.financialCategories).toHaveLength(2)
    expect(result.financialCategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: financialCategoryId1,
        }),
        expect.objectContaining({
          id: financialCategoryId2,
        }),
      ]),
    )
  })

  it('should return an empty array if no financial categories exist', async () => {
    const result = await listAllFinancialCategoryUseCase.execute()

    expect(result.financialCategories).toHaveLength(0)
  })
})
