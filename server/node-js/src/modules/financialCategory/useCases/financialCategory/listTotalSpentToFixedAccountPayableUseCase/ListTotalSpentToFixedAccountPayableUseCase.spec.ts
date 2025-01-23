import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategoriesRepositoryInMemory } from '@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory'

import { ListTotalSpentByFinancialCategoryToAccountPayableUseCase } from './ListTotalSpentByFinancialCategoryToAccountPayableUseCase'

let financialCategoriesRepositoryInMemory: FinancialCategoriesRepositoryInMemory
let listTotalSpentByFinancialCategoryToAccountPayableUseCase: ListTotalSpentByFinancialCategoryToAccountPayableUseCase

describe('[FinancialCategory] - List total spent by financial category to accounts payable', () => {
  const currentMonth = new Date().getMonth() + 1

  beforeEach(() => {
    financialCategoriesRepositoryInMemory =
      new FinancialCategoriesRepositoryInMemory()

    listTotalSpentByFinancialCategoryToAccountPayableUseCase =
      new ListTotalSpentByFinancialCategoryToAccountPayableUseCase(
        financialCategoriesRepositoryInMemory,
      )
  })

  it('should be able to calculate the total spent by financial category to accounts payable', async () => {
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

    const fixedAccountPayable1 = AccountPayable.createAccountPayable({
      description: 'Account Payable 1',
      amount: 100,
      dueDate: new Date(new Date().getFullYear(), currentMonth - 1, 1),
      isFixed: true,
      userId: 'userId',
      financialCategoryId: financialCategory1.id.toString(),
    })

    const fixedAccountPayable2 = AccountPayable.createAccountPayable({
      description: 'Account Payable 2',
      amount: 200,
      dueDate: new Date(new Date().getFullYear(), currentMonth - 1, 15),
      isFixed: true,
      userId: 'userId',
      financialCategoryId: financialCategory1.id.toString(),
    })

    const fixedAccountPayable3 = AccountPayable.createAccountPayable({
      description: 'Account Payable 3',
      amount: 50,
      dueDate: new Date(new Date().getFullYear(), currentMonth - 1, 20),
      isFixed: true,
      userId: 'userId',
      financialCategoryId: financialCategory2.id.toString(),
    })

    const accountsPayable = [
      fixedAccountPayable1,
      fixedAccountPayable2,
      fixedAccountPayable3,
    ]

    for (const accountPayable of accountsPayable) {
      await financialCategoriesRepositoryInMemory.addAccountPayable(
        accountPayable,
      )
    }

    const result =
      await listTotalSpentByFinancialCategoryToAccountPayableUseCase.execute({
        userId: 'userId',
        month: currentMonth,
      })

    expect(result.totalExpensesByFinancialCategory).toHaveLength(2)
    expect(result.totalExpensesByFinancialCategory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          financialCategory: expect.objectContaining({
            description: 'Category 1',
          }),
          totalSpent: 300.0,
        }),
        expect.objectContaining({
          financialCategory: expect.objectContaining({
            description: 'Category 2',
          }),
          totalSpent: 50.0,
        }),
      ]),
    )
  })

  it('should return an empty array if no accounts payable exist for the user', async () => {
    const result =
      await listTotalSpentByFinancialCategoryToAccountPayableUseCase.execute({
        userId: 'userWithoutAccountsPayable',
        month: currentMonth,
      })

    expect(result.totalExpensesByFinancialCategory).toHaveLength(0)
  })
})
