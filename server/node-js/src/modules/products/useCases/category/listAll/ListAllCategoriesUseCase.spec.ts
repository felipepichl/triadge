import { Category } from '@modules/products/domain/category/Category'
import { CategoriesRepositoryInMemory } from '@modules/products/repositories/category/in-memory/CategoriesRepositoryInMemory'

import { ListAllCategoryUseCase } from './ListAllCategoryUseCase'

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
let listAllCategoriesUseCase: ListAllCategoryUseCase

describe('[Product/Ctegory] - List all categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    listAllCategoriesUseCase = new ListAllCategoryUseCase(
      categoriesRepositoryInMemory,
    )
  })

  it('should be able to list all categories', async () => {
    const category1 = Category.createCategory({
      name: 'Category 1',
      description: 'Description Category 1',
    })

    const category2 = Category.createCategory({
      name: 'Category 2',
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
