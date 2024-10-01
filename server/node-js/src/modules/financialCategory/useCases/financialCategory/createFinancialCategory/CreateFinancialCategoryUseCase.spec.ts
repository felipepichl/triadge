import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategoriesRepositoryInMemory } from '@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory'
import { AppError } from '@shared/error/AppError'

import { CreateFinancialCategoryUseCase } from './CreateFinancialCategoryUseCase'

let financialCategoriesRepositoryInMemory: FinancialCategoriesRepositoryInMemory

let createFinancialCategoryUseCase: CreateFinancialCategoryUseCase

describe('[FinancialCategory] - Create a new financial category', () => {
  beforeEach(() => {
    financialCategoriesRepositoryInMemory =
      new FinancialCategoriesRepositoryInMemory()
    createFinancialCategoryUseCase = new CreateFinancialCategoryUseCase(
      financialCategoriesRepositoryInMemory,
    )
  })

  it('should be able to create a new financial category', async () => {
    const financialCategory = FinancialCategory.createFinancialCategory({
      description: 'Description Test',
      userId: 'userId',
    })

    await createFinancialCategoryUseCase.execute(financialCategory)

    const { description } = financialCategory

    const financialCategoryCreated =
      await financialCategoriesRepositoryInMemory.findByDescription(description)

    expect(financialCategoryCreated).toBeDefined()
    expect(financialCategoryCreated?.description).toEqual(
      financialCategory.description,
    )
  })

  it('should not be able to create a new financial category with same name another', async () => {
    const financialCategory = FinancialCategory.createFinancialCategory({
      description: 'Description Test',
      userId: 'userId',
    })

    await createFinancialCategoryUseCase.execute(financialCategory)

    await expect(
      createFinancialCategoryUseCase.execute(financialCategory),
    ).rejects.toEqual(
      new AppError('Financial Category description already exists', 400),
    )
  })
})
