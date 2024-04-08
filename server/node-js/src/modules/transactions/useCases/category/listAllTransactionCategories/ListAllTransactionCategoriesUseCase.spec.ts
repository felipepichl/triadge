import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'
import { TransactionCategoriesRepositoryInMemory } from '@modules/transactions/repositories/category/in-memory/TransactionCategoriesRepositoryInMemory'

import { ListAllTransactionCategoriesUseCase } from './ListAllTransactionCategoriesUseCase'

let transacitionCategoriesRepositoryInMemory: TransactionCategoriesRepositoryInMemory
let listAllTransactionCategoriesUseCase: ListAllTransactionCategoriesUseCase

describe('[Transaction]/[Category] - List all transacition categories', () => {
  beforeEach(() => {
    transacitionCategoriesRepositoryInMemory =
      new TransactionCategoriesRepositoryInMemory()

    listAllTransactionCategoriesUseCase =
      new ListAllTransactionCategoriesUseCase(
        transacitionCategoriesRepositoryInMemory,
      )
  })

  it('should be able to list all transacition categories', async () => {
    const transacitionCategory1 = TransactionCategory.createTransactionCategory(
      {
        description: 'Description Category 1',
      },
    )

    const transacitionCategory2 = TransactionCategory.createTransactionCategory(
      {
        description: 'Description Category 2',
      },
    )

    await transacitionCategoriesRepositoryInMemory.create(transacitionCategory1)
    await transacitionCategoriesRepositoryInMemory.create(transacitionCategory2)

    const { id: transacitionCategoryId1 } = transacitionCategory1
    const { id: transacitionCategoryId2 } = transacitionCategory2

    const result = await listAllTransactionCategoriesUseCase.execute()

    expect(result.transactionCategories).toHaveLength(2)
    expect(result.transactionCategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: transacitionCategoryId1,
        }),
        expect.objectContaining({
          id: transacitionCategoryId2,
        }),
      ]),
    )
  })

  it('should return an empty array if no categories exist', async () => {
    const result = await listAllTransactionCategoriesUseCase.execute()

    expect(result.transactionCategories).toHaveLength(0)
  })
})
