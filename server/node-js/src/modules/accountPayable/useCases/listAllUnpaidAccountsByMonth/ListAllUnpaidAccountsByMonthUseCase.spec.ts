import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { AccountsPayableRepositoryInMemory } from '@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory'

import { ListAllUnpaidAccountsByMonthUseCase } from './ListAllUnpaidAccountsByMonthUseCase'

let accountsPayableRepositoryInMemory: AccountsPayableRepositoryInMemory
let listAllUnpaidAccountsByMonthUseCase: ListAllUnpaidAccountsByMonthUseCase

async function createAccountPayable() {
  accountsPayableRepositoryInMemory = new AccountsPayableRepositoryInMemory()

  const accounts: AccountPayable[] = []

  const accountPayable1 = AccountPayable.createAccountPayable({
    description: 'Account Payable 1',
    amount: 200,
    dueDate: new Date('2025,04,01'),
    isFixed: true,
    userId: 'user_id',
    isPaid: false,
    financialCategoryId: 'financial_category_id',
    subcategoryId: 'subcategory_id',
  })

  const accountPayable2 = AccountPayable.createAccountPayable({
    description: 'Account Payable 2',
    amount: 300,
    dueDate: new Date('2025,04,01'),
    userId: 'user_id',
    isPaid: true,
    financialCategoryId: 'financial_category_id',
    subcategoryId: 'subcategory_id',
  })

  const accountPayable3 = AccountPayable.createAccountPayable({
    description: 'Account Payable 3',
    amount: 150,
    dueDate: new Date('2025,04,01'),
    userId: 'user_id',
    isPaid: true,
    financialCategoryId: 'financial_category_id',
    subcategoryId: 'subcategory_id',
  })

  accounts.push(accountPayable1, accountPayable2, accountPayable3)

  accountsPayableRepositoryInMemory.createMany(accounts)
}

describe('[AccountPayable] - List all unpaid accounts payable by month', () => {
  beforeEach(() => {
    createAccountPayable()

    listAllUnpaidAccountsByMonthUseCase =
      new ListAllUnpaidAccountsByMonthUseCase(accountsPayableRepositoryInMemory)
  })

  it('should be able to list all unpaid account payable by month', async () => {
    const { unpaidAccountsPayable, unpaidAccountsPayableTotalAmount } =
      await listAllUnpaidAccountsByMonthUseCase.execute({
        userId: 'user_id',
        month: 4,
      })

    expect(unpaidAccountsPayable[0]).toBeDefined()
    expect(unpaidAccountsPayable.length).toBe(1)
    expect(unpaidAccountsPayableTotalAmount).toBe(200)
  })
})
