import { CategoriesRepositoryInMemory } from '@modules/product/repositories/category/in-memory/CategoriesRepositoryInMemory'

import { AppError } from '@shared/error/AppError'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { Category } from '@modules/product/domain/category/Category'

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

let createCategoryUseCase: CreateCategoryUseCase

describe('[Product]/[Category] - Create a category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    )
  })

  it('should be able to create a new category', async () => {
    const category = Category.createCategory({
      name: 'Name Test',
      description: 'Description Test',
    })

    await createCategoryUseCase.execute(category)

    const { description } = category

    const categoryCreated =
      await categoriesRepositoryInMemory.listByDescription(description)

    expect(categoryCreated).toBeDefined()
    expect(categoryCreated?.name).toEqual(category.name)
  })

  it('should not be able to create a new category with same descripton another', async () => {
    const category = Category.createCategory({
      name: 'Name Test',
      description: 'Description Test',
    })

    await createCategoryUseCase.execute(category)

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('Category name already exixts', 400),
    )
  })
})
