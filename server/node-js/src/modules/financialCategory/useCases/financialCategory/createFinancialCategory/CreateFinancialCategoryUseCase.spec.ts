import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategoryRepositoryInMemory } from '@modules/financialCategory/repositories/in-memory/FinancialCategoryRepositoryInMemory'
import { AppError } from '@shared/error/AppError'

import { CreateFinancialCategoryUseCase } from './CreateFinancialCategoryUseCase'

let financialCategoryRepositoryInMemory: FinancialCategoryRepositoryInMemory

let createFinancialCategoryUseCase: CreateFinancialCategoryUseCase

describe('[FinancialCategory] - Create a new financial category', () => {
  beforeEach(() => {
    financialCategoryRepositoryInMemory =
      new FinancialCategoryRepositoryInMemory()
    createFinancialCategoryUseCase = new CreateFinancialCategoryUseCase(
      financialCategoryRepositoryInMemory,
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
      await financialCategoryRepositoryInMemory.findByDescription(description)

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
