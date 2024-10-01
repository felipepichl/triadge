import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategoriesRepositoryInMemory } from '@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory'

import { ListAllCategoriesByUserUseCase } from './ListAllCategoriesByUserUseCase'

let financialCategoriesRepositoryInMemory: FinancialCategoriesRepositoryInMemory
let listAllCategoriesByUserUseCase: ListAllCategoriesByUserUseCase

describe('[FinancialCategory] - List all financial categories by user', () => {
  beforeEach(() => {
    financialCategoriesRepositoryInMemory =
      new FinancialCategoriesRepositoryInMemory()

    listAllCategoriesByUserUseCase = new ListAllCategoriesByUserUseCase(
      financialCategoriesRepositoryInMemory,
    )
  })

  it('should be able to list all financial categories', async () => {
    const financialCategory1 = FinancialCategory.createFinancialCategory({
      description: 'Description Financial Category 1',
      userId: 'userId',
    })

    const financialCategory2 = FinancialCategory.createFinancialCategory({
      description: 'Description Financial Category 2',
      userId: 'userId',
    })

    await financialCategoriesRepositoryInMemory.create(financialCategory1)
    await financialCategoriesRepositoryInMemory.create(financialCategory2)

    const { id: financialCategoryId1 } = financialCategory1
    const { id: financialCategoryId2 } = financialCategory1

    const result = await listAllCategoriesByUserUseCase.execute({
      userId: 'userId',
    })

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

  it('should return an empty array if no financial categories by user exist', async () => {
    const result = await listAllCategoriesByUserUseCase.execute({
      userId: 'null',
    })

    expect(result.financialCategories).toHaveLength(0)
  })
})
