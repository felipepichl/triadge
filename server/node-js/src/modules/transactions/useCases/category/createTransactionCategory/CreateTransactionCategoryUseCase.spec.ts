import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'
import { TransactionCategoriesRepositoryInMemory } from '@modules/transactions/repositories/category/in-memory/TransactionCategoriesRepositoryInMemory'
import { AppError } from '@shared/error/AppError'

import { CreateTransactionCategoryUseCase } from './CreateTransactionCategoryUseCase'

let transactionCategoriesRepositoryInMemory: TransactionCategoriesRepositoryInMemory

let createTransactionCategoryUseCase: CreateTransactionCategoryUseCase

describe('[Transaction]/[Category] - Create a transaction category', () => {
  beforeEach(() => {
    transactionCategoriesRepositoryInMemory =
      new TransactionCategoriesRepositoryInMemory()
    createTransactionCategoryUseCase = new CreateTransactionCategoryUseCase(
      transactionCategoriesRepositoryInMemory,
    )
  })

  it('should be able to create a new transaction category', async () => {
    const transactionCategory = TransactionCategory.createTransactionCategory({
      description: 'Description Test',
    })

    await createTransactionCategoryUseCase.execute(transactionCategory)

    const { description } = transactionCategory

    const transactionCategoryCreated =
      await transactionCategoriesRepositoryInMemory.findByDescription(
        description,
      )

    expect(transactionCategoryCreated).toBeDefined()
    expect(transactionCategoryCreated?.description).toEqual(
      transactionCategory.description,
    )
  })

  it('should not be able to create a new transaction category with same name another', async () => {
    const transactionCategory = TransactionCategory.createTransactionCategory({
      description: 'Description Test',
    })

    await createTransactionCategoryUseCase.execute(transactionCategory)

    await expect(
      createTransactionCategoryUseCase.execute(transactionCategory),
    ).rejects.toEqual(
      new AppError('Transaction Category description already exixts', 400),
    )
  })
})
