import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategoriesRepositoryInMemory } from '@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory'

import { ListSubcategoriesByCategoryIdUseCase } from './ListSubcategoriesByCategoryIdUseCase'

let financialCategoriesRepositoryInMemory: FinancialCategoriesRepositoryInMemory
let listSubcategoriesByCategoryIdUseCase: ListSubcategoriesByCategoryIdUseCase

describe('[FinancialCategory]/[Subcategory] - List all subcategories to financial categories', () => {
  beforeEach(() => {
    financialCategoriesRepositoryInMemory =
      new FinancialCategoriesRepositoryInMemory()

    listSubcategoriesByCategoryIdUseCase =
      new ListSubcategoriesByCategoryIdUseCase(
        financialCategoriesRepositoryInMemory,
      )
  })

  it('should be able to list all subcategories to financial category', async () => {
    const financialCategory1 = FinancialCategory.createFinancialCategory({
      description: 'Description Financial Category 1',
      userId: 'userId',
    })

    await financialCategoriesRepositoryInMemory.create(financialCategory1)
    const { id: parentCategoryId } = financialCategory1

    const subcategory1 = FinancialCategory.createFinancialCategory({
      description: 'Description Subcategory 1',
      userId: 'userId',
      parentCategoryId: parentCategoryId.toString(),
    })
    await financialCategoriesRepositoryInMemory.create(subcategory1)

    const result = await listSubcategoriesByCategoryIdUseCase.execute({
      userId: 'userId',
      parentCategoryId: parentCategoryId.toString(),
    })

    expect(result.subcategories).toHaveLength(1)
    expect(result.subcategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({
            parentCategoryId: parentCategoryId.toString(),
          }),
        }),
      ]),
    )
  })

  it('should return an empty array if no subcategopries to financial categories exist', async () => {
    const result = await listSubcategoriesByCategoryIdUseCase.execute({
      parentCategoryId: 'null',
      userId: 'null',
    })

    expect(result.subcategories).toHaveLength(0)
  })
})
