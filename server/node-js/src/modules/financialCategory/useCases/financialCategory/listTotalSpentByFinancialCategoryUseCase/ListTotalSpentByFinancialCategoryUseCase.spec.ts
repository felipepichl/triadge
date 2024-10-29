import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategoriesRepositoryInMemory } from '@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory'
import { Transaction } from '@modules/transactions/domain/transaction/Transaction'

import { ListTotalSpentByFinancialCategoryUseCase } from './ListTotalSpentByFinancialCategoryUseCase'

let financialCategoriesRepositoryInMemory: FinancialCategoriesRepositoryInMemory
let listTotalSpentByFinancialCategoryUseCase: ListTotalSpentByFinancialCategoryUseCase

describe('[FinancialCategory] - List total spent by financial category', () => {
  const currentMonth = new Date().getMonth() + 1

  beforeEach(() => {
    financialCategoriesRepositoryInMemory =
      new FinancialCategoriesRepositoryInMemory()

    listTotalSpentByFinancialCategoryUseCase =
      new ListTotalSpentByFinancialCategoryUseCase(
        financialCategoriesRepositoryInMemory,
      )
  })

  it('should be able to calculate the total spent by financial category', async () => {
    const financialCategory1 = FinancialCategory.createFinancialCategory({
      description: 'Category 1',
      userId: 'userId',
    })

    const financialCategory2 = FinancialCategory.createFinancialCategory({
      description: 'Category 2',
      userId: 'userId',
    })

    const finacialCategories = [financialCategory1, financialCategory2]

    for (const financialCategory of finacialCategories) {
      await financialCategoriesRepositoryInMemory.create(financialCategory)
    }

    const transaction1 = Transaction.createTransaction({
      description: 'Transaction 1',
      type: 'outcome',
      value: 10.0,
      date: new Date(new Date().getFullYear(), currentMonth - 1, 1),
      userId: 'userId',
      financialCategoryId: financialCategory1.id.toString(),
    })

    const transaction2 = Transaction.createTransaction({
      description: 'Transaction 2',
      type: 'outcome',
      value: 20.0,
      date: new Date(new Date().getFullYear(), currentMonth - 1, 15),
      userId: 'userId',
      financialCategoryId: financialCategory1.id.toString(),
    })

    const transaction3 = Transaction.createTransaction({
      description: 'Transaction 3',
      type: 'outcome',
      value: 5.0,
      date: new Date(new Date().getFullYear(), currentMonth - 1, 20),
      userId: 'userId',
      financialCategoryId: financialCategory2.id.toString(),
    })

    const transactions = [transaction1, transaction2, transaction3]

    for (const transaction of transactions) {
      await financialCategoriesRepositoryInMemory.addTransaction(transaction)
    }

    const result = await listTotalSpentByFinancialCategoryUseCase.execute({
      userId: 'userId',
      type: { type: 'outcome' },
      month: currentMonth,
    })

    expect(result.totalExpensesByFinancialCategory).toHaveLength(2)
    expect(result.totalExpensesByFinancialCategory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          financialCategory: expect.objectContaining({
            description: 'Category 1',
          }),
          totalSpent: 30.0,
        }),
        expect.objectContaining({
          financialCategory: expect.objectContaining({
            description: 'Category 2',
          }),
          totalSpent: 5.0,
        }),
      ]),
    )
  })

  it('should return an empty array if no transactions exist for the user', async () => {
    const result = await listTotalSpentByFinancialCategoryUseCase.execute({
      userId: 'userWithoutTransactions',
      type: { type: 'outcome' },
      month: currentMonth,
    })

    expect(result.totalExpensesByFinancialCategory).toHaveLength(0)
  })
})
