import { Category } from '@modules/transactions/domain/category/Category'
import { CategoriesRepositoryInMemory } from '@modules/transactions/repositories/category/in-memory/CategoriesRepositoryInMemory'
import { AppError } from '@shared/error/AppError'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

let createCategoryUseCase: CreateCategoryUseCase

describe('[Transaction]/[Category] - Create a transaction category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
  })

  it('should be able to create a new transaction category', async () => {
    const category = Category.createCategory({
      description: 'Description Test',
    })

    await createCategoryUseCase.execute(category)

    const { description } = category

    const categoryCreated =
      await categoriesRepositoryInMemory.findByDescription(description)

    expect(categoryCreated).toBeDefined()
    expect(categoryCreated?.description).toEqual(category.description)
  })

  it('should not be able to create a new transaction category with same name another', async () => {
    const category = Category.createCategory({
      description: 'Description Test',
    })

    await createCategoryUseCase.execute(category)

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('Transaction Category name already exixts', 400),
    )
  })
})
