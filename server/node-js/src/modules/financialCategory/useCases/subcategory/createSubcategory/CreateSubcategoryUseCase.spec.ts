import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategoriesRepositoryInMemory } from '@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory'
import { AppError } from '@shared/error/AppError'

import { CreateSubcategoryUseCase } from './CreateSubcategoryUseCase'

let financialCategoriesRepositoryInMemory: FinancialCategoriesRepositoryInMemory

let createSubcategoryUseCase: CreateSubcategoryUseCase

describe('[FinancialCategory]/[Subcategory] - Create a new subcategory to financial category', () => {
  beforeEach(() => {
    financialCategoriesRepositoryInMemory =
      new FinancialCategoriesRepositoryInMemory()
    createSubcategoryUseCase = new CreateSubcategoryUseCase(
      financialCategoriesRepositoryInMemory,
    )
  })

  it('should be able to create a new  subcategory to financial category', async () => {
    const subcategory = FinancialCategory.createFinancialCategory({
      description: 'Description Test',
      userId: 'userId',
      parentCategoryId: 'parentCategoryId',
    })

    await createSubcategoryUseCase.execute(subcategory)

    const { description, parentCategoryId } = subcategory

    const subcategoryCreated =
      await financialCategoriesRepositoryInMemory.findByDescriptionAndParentCategory(
        description,
        parentCategoryId,
      )

    expect(subcategoryCreated).toBeDefined()
    expect(subcategoryCreated?.description).toEqual(subcategory.description)
    expect(subcategoryCreated?.parentCategoryId).toEqual(
      subcategory.parentCategoryId,
    )
  })

  it('should not be able to create a new financial category with same name another', async () => {
    const subcategory = FinancialCategory.createFinancialCategory({
      description: 'Description',
      userId: 'userId',
      parentCategoryId: 'parentCategoryId',
    })

    await createSubcategoryUseCase.execute(subcategory)

    await expect(createSubcategoryUseCase.execute(subcategory)).rejects.toEqual(
      new AppError('Subategory description already exists', 400),
    )
  })
})
