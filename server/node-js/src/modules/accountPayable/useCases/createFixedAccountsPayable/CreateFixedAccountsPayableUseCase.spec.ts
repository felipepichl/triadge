import { AccountsPayableRepositoryInMemory } from '@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory'

import { CreateFixedAccountsPayableUseCase } from './CreateFixedAccounsPayableUseCase'

let accountsPayableRepositoryInMemory: AccountsPayableRepositoryInMemory
let createFixedAccountsPayableUseCase: CreateFixedAccountsPayableUseCase

describe('[AccountPayable] - Create a fixed account payable', () => {
  beforeEach(() => {
    accountsPayableRepositoryInMemory = new AccountsPayableRepositoryInMemory()

    createFixedAccountsPayableUseCase = new CreateFixedAccountsPayableUseCase(
      accountsPayableRepositoryInMemory,
    )
  })

  it('should be able to create a new fixed account payable', async () => {
    await createFixedAccountsPayableUseCase.execute({
      description: 'Account Payable description',
      amount: 100,
      dueDate: new Date(),
      userId: 'user_id',
      financialCategoryId: 'financial_category_id',
      subcategoryId: 'subcategory_id',
    })

    const accountPayableCreated =
      await accountsPayableRepositoryInMemory.listAll('user_id')

    expect(accountPayableCreated[0]).toBeDefined()
    expect(accountPayableCreated.length).toBe(12)
  })
})
