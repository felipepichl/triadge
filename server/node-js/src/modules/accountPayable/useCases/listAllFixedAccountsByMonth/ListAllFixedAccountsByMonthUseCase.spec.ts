import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { AccountsPayableRepositoryInMemory } from '@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory'

import { ListAllFixedAccountsByMonthUseCase } from './ListAllFixedAccountsByMonthUseCase'

let accountsPayableRepositoryInMemory: AccountsPayableRepositoryInMemory
let listAllFixedAccountsByMonthUseCase: ListAllFixedAccountsByMonthUseCase

async function createAccountPayable() {
  accountsPayableRepositoryInMemory = new AccountsPayableRepositoryInMemory()

  const accounts: AccountPayable[] = []

  const accountPayable1 = AccountPayable.createAccountPayable({
    description: 'Fixed Account Payable',
    amount: 100,
    dueDate: new Date('2025,04,01'),
    isFixed: true,
    userId: 'user_id',
    financialCategoryId: 'financial_category_id',
    subcategoryId: 'subcategory_id',
  })

  const accountPayable2 = AccountPayable.createAccountPayable({
    description: 'Unfixed Account Payable',
    amount: 100,
    dueDate: new Date('2025,04,01'),
    userId: 'user_id',
    financialCategoryId: 'financial_category_id',
    subcategoryId: 'subcategory_id',
  })

  accounts.push(accountPayable1, accountPayable2)

  accountsPayableRepositoryInMemory.createMany(accounts)
}

describe('[AccountPayable] - List all fixed accounts payable by month', () => {
  beforeEach(() => {
    createAccountPayable()

    listAllFixedAccountsByMonthUseCase = new ListAllFixedAccountsByMonthUseCase(
      accountsPayableRepositoryInMemory,
    )
  })

  it('should be able to list all fixed account payable by month', async () => {
    const { fixedAccountsPayable } =
      await listAllFixedAccountsByMonthUseCase.execute({
        userId: 'user_id',
        month: 4,
      })

    expect(fixedAccountsPayable[0]).toBeDefined()
    expect(fixedAccountsPayable.length).toBe(1)
  })
})
