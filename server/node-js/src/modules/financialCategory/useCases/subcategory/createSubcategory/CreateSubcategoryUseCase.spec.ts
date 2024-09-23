import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategoryRepositoryInMemory } from '@modules/financialCategory/repositories/in-memory/FinancialCategoryRepositoryInMemory'
import { AppError } from '@shared/error/AppError'

import { CreateSubcategoryUseCase } from './CreateSubcategoryUseCase'

let financialCategoryRepositoryInMemory: FinancialCategoryRepositoryInMemory

let createSubcategoryUseCase: CreateSubcategoryUseCase

describe('[FinancialCategory]/[Subcategory] - Create a new subcategory to financial category', () => {
  beforeEach(() => {
    financialCategoryRepositoryInMemory =
      new FinancialCategoryRepositoryInMemory()
    createSubcategoryUseCase = new CreateSubcategoryUseCase(
      financialCategoryRepositoryInMemory,
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
      await financialCategoryRepositoryInMemory.findByDescriptionAndParentCategory(
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
