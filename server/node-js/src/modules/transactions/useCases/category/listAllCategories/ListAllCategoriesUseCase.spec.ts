import { Category } from '@modules/transactions/domain/category/Category'
import { CategoriesRepositoryInMemory } from '@modules/transactions/repositories/category/in-memory/CategoriesRepositoryInMemory'

import { ListAllCategoriesUseCase } from './ListAllCategoriesUseCase'

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
let listAllCategoriesUseCase: ListAllCategoriesUseCase

describe('[Transaction]/[Category] - List all transacition categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    listAllCategoriesUseCase = new ListAllCategoriesUseCase(
      categoriesRepositoryInMemory,
    )
  })

  it('should be able to list all transacition categories', async () => {
    const category1 = Category.createCategory({
      description: 'Description Category 1',
    })

    const category2 = Category.createCategory({
      description: 'Description Category 2',
    })

    await categoriesRepositoryInMemory.create(category1)
    await categoriesRepositoryInMemory.create(category2)

    const { id: categoryId1 } = category1
    const { id: categoryId2 } = category2

    const result = await listAllCategoriesUseCase.execute()

    expect(result.categories).toHaveLength(2)
    expect(result.categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: categoryId1,
        }),
        expect.objectContaining({
          id: categoryId2,
        }),
      ]),
    )
  })

  it('should return an empty array if no categories exist', async () => {
    const result = await listAllCategoriesUseCase.execute()

    expect(result.categories).toHaveLength(0)
  })
})
